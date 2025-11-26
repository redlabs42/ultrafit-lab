# Code Review - Problemas Críticos e Correções

## 🔴 CRÍTICO - Segurança

### 1. **Tokens Armazenados em localStorage (Alto Risco)**
**Arquivo:** `src/frontend/store/authStore.ts`, `src/frontend/lib/api/client.ts`

**Problema:**
```typescript
// authStore.ts - linha 38-40
localStorage.setItem("accessToken", auth.accessToken);
localStorage.setItem("refreshToken", auth.refreshToken);
```

**Risco:** 
- Tokens em localStorage são vulneráveis a ataques XSS
- Qualquer script malicioso pode acessar os tokens
- Refresh tokens são especialmente sensíveis e não deveriam estar no client-side

**Recomendação:**
- Usar httpOnly cookies para tokens (requer backend)
- Ou usar sessionStorage (menos persistente, mais seguro)
- Implementar Content Security Policy (CSP)
- Adicionar proteção contra XSS

**Correção Sugerida:**
```typescript
// Opção 1: Usar sessionStorage (temporário)
sessionStorage.setItem("accessToken", auth.accessToken);

// Opção 2: Não armazenar refresh token no client
// Deixar o backend gerenciar refresh via httpOnly cookie
```

---

### 2. **Falta de Validação de Token Expirado**
**Arquivo:** `src/frontend/hooks/useAuth.ts`

**Problema:**
```typescript
// linha 148 - Não verifica se o token está expirado
if (session.isValid()) {
  setAuth(authUser);
  return session;
}
```

**Risco:**
- Usuário pode continuar usando token expirado
- Sessão pode parecer válida mas falhar nas requisições

**Correção:**
```typescript
if (session.isValid()) {
  const expiresAt = idToken.getExpiration();
  const now = Math.floor(Date.now() / 1000);
  
  // Check if token is about to expire (within 5 minutes)
  if (expiresAt - now < 300) {
    // Refresh token proactively
    try {
      const newSession = await cognito.refreshSession();
      // Update with new session
    } catch (error) {
      logoutStore();
      return null;
    }
  }
  
  setAuth(authUser);
  return session;
}
```

---

### 3. **Erro de Refresh Token Redireciona Sem Limpar Estado**
**Arquivo:** `src/frontend/lib/api/client.ts`

**Problema:**
```typescript
// linha 67-70
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");
window.location.href = "/login";
```

**Risco:**
- Estado do Zustand não é limpo
- Pode causar inconsistência entre localStorage e store
- Hard redirect pode perder contexto

**Correção:**
```typescript
// Importar o store
import { useAuthStore } from "@/store";

// No catch do refresh
catch (_refreshError) {
  if (typeof window !== "undefined") {
    // Limpar tudo
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("auth-storage");
    
    // Usar router do Next.js em vez de window.location
    // Ou disparar evento customizado para o app reagir
    window.dispatchEvent(new Event('auth:logout'));
  }
}
```

---

## 🟡 IMPORTANTE - Melhorias

### 4. **Falta de Rate Limiting no Client**
**Arquivo:** `src/frontend/lib/api/client.ts`

**Problema:**
- Não há proteção contra múltiplas requisições simultâneas
- Pode causar race conditions no refresh token

**Correção:**
```typescript
private refreshPromise: Promise<string> | null = null;

private async refreshToken(): Promise<string> {
  // Evitar múltiplos refreshes simultâneos
  if (this.refreshPromise) {
    return this.refreshPromise;
  }

  this.refreshPromise = (async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token");
      
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });
      
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } finally {
      this.refreshPromise = null;
    }
  })();

  return this.refreshPromise;
}
```

---

### 5. **Dados Sensíveis em Logs**
**Arquivo:** `src/frontend/services/payments.ts`

**Problema:**
```typescript
// linha 73-79 - CVV e dados de cartão podem ser logados em erros
async addPaymentMethod(data: {
  cardNumber?: string;
  cvv?: string;
  // ...
})
```

**Risco:**
- Dados de cartão podem aparecer em logs de erro
- Violação de PCI DSS

**Correção:**
```typescript
// Nunca enviar CVV/cardNumber diretamente
// Usar tokenização (Stripe, Asaas, etc)
async addPaymentMethod(data: {
  paymentToken: string; // Token do gateway de pagamento
  type: "credit_card" | "pix" | "boleto";
})
```

---

### 6. **Falta de Sanitização de Inputs**
**Arquivo:** `src/frontend/components/auth/LoginForm.tsx`, `RegisterForm.tsx`

**Problema:**
- Inputs não são sanitizados antes de enviar
- Pode permitir injection attacks

**Correção:**
```typescript
import DOMPurify from 'isomorphic-dompurify';

const onSubmit = (data: LoginFormData) => {
  const sanitizedData = {
    email: DOMPurify.sanitize(data.email.trim().toLowerCase()),
    password: data.password, // Não sanitizar senha
  };
  signIn(sanitizedData);
};
```

---

### 7. **Falta de Timeout em Cognito Operations**
**Arquivo:** `src/frontend/lib/auth/cognito.ts`

**Problema:**
- Operações do Cognito podem travar indefinidamente
- Não há timeout configurado

**Correção:**
```typescript
const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number = 30000
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Operation timeout')), timeoutMs)
    ),
  ]);
};

export const signIn = (params: SignInParams): Promise<CognitoUserSession> => {
  return withTimeout(
    new Promise((resolve, reject) => {
      // ... código existente
    }),
    15000 // 15 segundos
  );
};
```

---

## 🟢 BOAS PRÁTICAS - Recomendações

### 8. **Adicionar Error Boundary Global**
**Arquivo:** Criar `src/frontend/app/error.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Algo deu errado!</h2>
        <p className="text-muted-foreground">
          Ocorreu um erro inesperado. Por favor, tente novamente.
        </p>
        <Button onClick={reset}>Tentar novamente</Button>
      </div>
    </div>
  );
}
```

---

### 9. **Adicionar Logging e Monitoring**
**Arquivo:** `src/frontend/lib/monitoring.ts`

```typescript
export const logger = {
  error: (message: string, error?: Error, context?: object) => {
    if (process.env.NODE_ENV === 'production') {
      // Enviar para Sentry, DataDog, etc
      console.error(message, { error, context });
    } else {
      console.error(message, error, context);
    }
  },
  
  warn: (message: string, context?: object) => {
    console.warn(message, context);
  },
  
  info: (message: string, context?: object) => {
    if (process.env.NODE_ENV !== 'production') {
      console.info(message, context);
    }
  },
};
```

---

### 10. **Adicionar Content Security Policy**
**Arquivo:** `src/frontend/next.config.ts`

```typescript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  }
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## 📋 Checklist de Segurança

- [ ] Migrar tokens para httpOnly cookies ou sessionStorage
- [ ] Implementar validação de token expirado
- [ ] Adicionar rate limiting no refresh token
- [ ] Remover dados sensíveis de cartão do client
- [ ] Implementar sanitização de inputs
- [ ] Adicionar timeouts em operações assíncronas
- [ ] Configurar CSP headers
- [ ] Adicionar error boundary global
- [ ] Implementar logging estruturado
- [ ] Configurar HTTPS em produção
- [ ] Implementar CSRF protection
- [ ] Adicionar testes de segurança

---

## 🎯 Prioridade de Implementação

1. **Imediato (Antes de produção):**
   - Migrar tokens para solução mais segura
   - Remover dados de cartão do client
   - Adicionar CSP headers

2. **Curto Prazo (1-2 semanas):**
   - Implementar validação de token expirado
   - Adicionar rate limiting
   - Implementar error boundary

3. **Médio Prazo (1 mês):**
   - Adicionar monitoring completo
   - Implementar testes de segurança
   - Documentar fluxos de autenticação

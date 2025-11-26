# 🌊 UltraFit Frontend - Liquid Glass Design System

Frontend moderno com design inspirado no macOS, usando Next.js 15, React 19 e Liquid Glass Design System.

## 🎨 Design System

Este projeto usa o **Liquid Glass Design System**, inspirado no macOS com efeitos de vidro líquido, blur e animações suaves.

### 📚 Documentação Completa

- **[Índice Geral](./DESIGN_SYSTEM_INDEX.md)** - Navegação completa da documentação
- **[Quick Start](./QUICK_START_LIQUID_GLASS.md)** - Comece aqui! (5 minutos)
- **[Resumo](./LIQUID_GLASS_SUMMARY.md)** - Visão geral do sistema
- **[Design System](./LIQUID_GLASS_DESIGN_SYSTEM.md)** - Documentação completa
- **[Checklist](./LIQUID_GLASS_CHECKLIST.md)** - Implementação passo a passo

### 🚀 Quick Start

```tsx
// Card com glass effect
<div className="glass-card hover-lift p-6">
  <h3 className="text-xl font-bold mb-2">Título</h3>
  <p className="text-secondary">Descrição</p>
</div>

// Botão primary
<button className="btn-liquid-primary">
  Salvar
</button>

// Input glass
<input className="input-glass" placeholder="Nome" />

// Badge de status
<span className="badge-floating badge-success">
  ✓ Ativo
</span>
```

### 🎨 Paleta de Cores

**Light Mode:**
- Primary: `#007AFF` (Azul Apple)
- Accent: `#34C759` (Verde Apple)
- Background: `#F5F5F7`

**Dark Mode:**
- Primary: `#0A84FF` (Azul claro)
- Accent: `#32D74B` (Verde claro)
- Background: `#000000`

Ver `lib/theme.ts` para paleta completa.

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **React 19** - Biblioteca UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management
- **React Query** - Data fetching
- **React Hook Form** - Formulários
- **Zod** - Validação
- **AWS Cognito** - Autenticação

## 🚀 Getting Started

### Instalação

```bash
npm install
# ou
pnpm install
```

### Desenvolvimento

```bash
npm run dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Ver Demo do Design System

Crie uma página de demo:

```tsx
// app/demo/page.tsx
import { LiquidGlassDemo } from "@/components/ui/liquid-glass-demo";

export default function DemoPage() {
  return <LiquidGlassDemo />;
}
```

Acesse: [http://localhost:3000/demo](http://localhost:3000/demo)

## 📁 Estrutura do Projeto

```
src/frontend/
├── app/                    # App Router (Next.js 15)
│   ├── globals.css        # Estilos globais + variáveis CSS
│   ├── liquid-glass.css   # Classes utilitárias Liquid Glass
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
│
├── components/            # Componentes React
│   ├── ui/               # Componentes base
│   ├── auth/             # Autenticação
│   ├── workout/          # Treinos
│   ├── nutrition/        # Nutrição
│   └── ...
│
├── lib/                   # Utilitários
│   ├── theme.ts          # Fonte da verdade (cores)
│   ├── theme-utils.ts    # Utilitários de tema
│   └── ...
│
├── hooks/                 # Custom hooks
│   ├── useTheme.ts       # Hook de tema
│   └── ...
│
├── services/              # API services
├── store/                 # Zustand stores
├── types/                 # TypeScript types
│
└── 📄 Documentação
    ├── DESIGN_SYSTEM_INDEX.md
    ├── QUICK_START_LIQUID_GLASS.md
    ├── LIQUID_GLASS_SUMMARY.md
    ├── LIQUID_GLASS_DESIGN_SYSTEM.md
    └── LIQUID_GLASS_CHECKLIST.md
```

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Lint
npm run lint

# Format (Biome)
npm run format
```

## 🌓 Dark Mode

O projeto suporta dark mode automático usando `next-themes`:

```tsx
import { useTheme } from "@/hooks/useTheme";

function MyComponent() {
  const { isDark, setTheme, colors } = useTheme();
  
  return (
    <button onClick={() => setTheme(isDark ? "light" : "dark")}>
      Alternar Tema
    </button>
  );
}
```

## 🎨 Usando o Design System

### Classes CSS Disponíveis

```css
/* Glass Effects */
.glass-card
.glass-surface
.glass-light

/* Blur */
.blur-sm, .blur-md, .blur-lg, .blur-xl

/* Shadows */
.shadow-glass, .shadow-glass-lg, .shadow-glass-xl

/* Buttons */
.btn-liquid-primary
.btn-liquid-secondary
.btn-liquid-ghost

/* Inputs */
.input-glass

/* Badges */
.badge-floating
.badge-success, .badge-warning, .badge-danger, .badge-info

/* Hover Effects */
.hover-lift, .hover-scale, .hover-glow

/* Animations */
.fade-in, .slide-in, .loading-shimmer
```

### Tailwind Classes

```tsx
// Cores
<div className="bg-primary text-primary-foreground">
<div className="bg-success/10 text-success">
<div className="border-primary">

// Backgrounds
<div className="bg-background">
<div className="bg-background-alt">

// Text
<p className="text-foreground">
<p className="text-secondary">
<p className="text-tertiary">
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-pool-id
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
```

### Tailwind Config

O `tailwind.config.ts` já está configurado com as cores do tema:

```typescript
theme: {
  extend: {
    colors: {
      primary: "hsl(var(--primary))",
      accent: "hsl(var(--accent))",
      success: "hsl(var(--success))",
      // ...
    }
  }
}
```

## 📱 Responsividade

O design system é mobile-first:

```tsx
<div className="p-4 md:p-6 lg:p-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Cards */}
  </div>
</div>
```

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## ♿ Acessibilidade

O design system segue WCAG 2.1 Level AA:

- Contraste mínimo 4.5:1 para texto
- Focus states visíveis
- Navegação por teclado
- ARIA labels
- Suporte a leitores de tela
- `prefers-reduced-motion`

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com coverage
npm run test:coverage

# Testes E2E
npm run test:e2e
```

## 📦 Build e Deploy

```bash
# Build para produção
npm run build

# Analisar bundle
npm run analyze

# Deploy (exemplo Vercel)
vercel deploy
```

## 🤝 Contribuindo

1. Leia a documentação do design system
2. Siga o checklist de implementação
3. Use as classes CSS utilitárias
4. Teste em light e dark mode
5. Verifique acessibilidade
6. Faça commits pequenos e descritivos

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 📝 Licença

Proprietary - UltraFit

---

**Documentação completa**: Ver [DESIGN_SYSTEM_INDEX.md](./DESIGN_SYSTEM_INDEX.md)

**Quick Start**: Ver [QUICK_START_LIQUID_GLASS.md](./QUICK_START_LIQUID_GLASS.md)

# 🔐 AÇÃO URGENTE: Revogar API Key do Google Gemini

## ⚠️ PROBLEMA CRÍTICO DE SEGURANÇA

A API key do Google Gemini foi **EXPOSTA** durante desenvolvimento:

```
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyArKlM0T2aO8vT_MPd2Egs79klSuH0jVyI
```

**Status:** ❌ **CHAVE COMPROMETIDA** - Esta chave foi exposta em logs/conversas e deve ser REVOGADA imediatamente.

---

## 📋 CHECKLIST DE AÇÕES IMEDIATAS

### ✅ Passo 1: Revogar a Chave Atual

1. Acesse o [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Localize a chave que termina com `...H0jVyI`
4. Clique em **"Delete"** ou **"Revoke"**
5. Confirme a revogação

### ✅ Passo 2: Criar Nova Chave

1. No mesmo painel do Google AI Studio
2. Clique em **"Create API Key"**
3. Selecione o projeto apropriado
4. Copie a nova chave gerada

### ✅ Passo 3: Atualizar Arquivos Locais

Atualize os seguintes arquivos **locais** (NÃO commitados):

**Arquivo:** `src/frontend/.env`
```bash
# Google Gemini API Key
GOOGLE_GENERATIVE_AI_API_KEY=SUA_NOVA_CHAVE_AQUI
```

**Arquivo:** `src/frontend/.env.local`
```bash
# Google Gemini API Key
GOOGLE_GENERATIVE_AI_API_KEY=SUA_NOVA_CHAVE_AQUI
```

### ✅ Passo 4: Configurar em Produção

Se estiver usando Vercel:

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings → Environment Variables**
4. Adicione/Atualize:
   - **Key:** `GOOGLE_GENERATIVE_AI_API_KEY`
   - **Value:** Sua nova chave
   - **Environment:** Production, Preview, Development
5. **Redeploy** a aplicação para aplicar as mudanças

### ✅ Passo 5: Verificar Proteção

Certifique-se de que os arquivos `.env` estão protegidos:

```bash
# No terminal:
cd /Users/leonardo.brizolla/dev/ultrafit-lab/src/frontend
git status | grep "\.env"
```

**Resultado esperado:** Apenas `.env.example` deve aparecer (ou nada)

Se `.env` ou `.env.local` aparecerem:

```bash
# NUNCA faça git add de arquivos .env!
git reset HEAD .env
git reset HEAD .env.local
```

---

## 🔒 BOAS PRÁTICAS DE SEGURANÇA

### 1. Proteção de Secrets

✅ **SEMPRE:**
- Mantenha `.env` e `.env.local` no `.gitignore`
- Use `.env.example` para documentar variáveis necessárias (sem valores)
- Gerencie secrets via UI de plataformas (Vercel, AWS, etc.)

❌ **NUNCA:**
- Commite arquivos `.env` com valores reais
- Compartilhe API keys em chat/email
- Hardcode secrets no código

### 2. Rotação de Chaves

- **Mensalmente:** Revise e rotacione API keys sensíveis
- **Imediatamente:** Após qualquer suspeita de exposição
- **Documentação:** Mantenha histórico de rotações (sem registrar as chaves)

### 3. Monitoramento

Configure alertas no Google Cloud Console:
- Uso anormal da API key
- Requisições de IPs suspeitos
- Limite de quota excedido

---

## 📊 Status Atual

- [x] Arquivo `.env` protegido pelo `.gitignore`
- [x] Arquivo `.env.example` atualizado e commitado
- [ ] **PENDENTE:** Revogar chave antiga comprometida
- [ ] **PENDENTE:** Criar nova chave
- [ ] **PENDENTE:** Atualizar arquivos locais
- [ ] **PENDENTE:** Configurar em produção

---

## 🆘 Em Caso de Problemas

Se após trocar a chave a API não funcionar:

1. **Verifique o nome da variável de ambiente:**
   ```typescript
   // Em route.ts usa: process.env.GOOGLE_GENERATIVE_AI_API_KEY
   ```

2. **Reinicie o servidor de desenvolvimento:**
   ```bash
   # Pressione Ctrl+C no terminal do pnpm dev
   pnpm dev
   ```

3. **Verifique logs de erro:**
   - Console do navegador (F12)
   - Terminal do servidor
   - Vercel deployment logs

4. **Teste a chave manualmente:**
   ```bash
   curl -H "Content-Type: application/json" \
        -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=SUA_CHAVE"
   ```

---

## ✅ Confirmação de Conclusão

Após completar todos os passos, marque:

- [ ] Chave antiga revogada no Google AI Studio
- [ ] Nova chave criada
- [ ] Arquivos `.env` e `.env.local` atualizados localmente
- [ ] Variável de ambiente atualizada no Vercel
- [ ] Aplicação redeployed (se necessário)
- [ ] Funcionalidade testada e funcionando

**Data da revogação:** ________________

**Por:** ________________

---

## 📚 Referências

- [Google AI Studio](https://makersuite.google.com/app/apikey)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [Best Practices for API Keys](https://cloud.google.com/docs/authentication/api-keys)

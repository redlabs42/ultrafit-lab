# Checklist de Testes - Ultrafit Lab

## 🔐 Autenticação

### Registro de Usuário
- [ ] Acessar `/register`
- [ ] Preencher formulário com dados válidos
- [ ] Verificar se recebe email de confirmação
- [ ] Confirmar email em `/auth/confirm`
- [ ] Verificar redirecionamento para `/login`

### Login
- [ ] Acessar `/login`
- [ ] Fazer login com credenciais válidas
- [ ] Verificar redirecionamento para `/dashboard`
- [ ] Verificar se URL muda corretamente
- [ ] Verificar se dados do usuário aparecem no header

### Proteção de Rotas
- [ ] Tentar acessar `/dashboard` sem login → deve redirecionar para `/login`
- [ ] Fazer login e acessar `/dashboard` → deve funcionar
- [ ] Fazer logout e tentar acessar `/dashboard` → deve redirecionar
- [ ] Estando logado, tentar acessar `/login` → deve redirecionar para `/dashboard`

### Persistência de Sessão
- [ ] Fazer login
- [ ] Recarregar a página (F5)
- [ ] Verificar se continua logado
- [ ] Fechar e reabrir o navegador
- [ ] Verificar se continua logado

### Logout
- [ ] Fazer logout pelo menu do usuário
- [ ] Verificar se é redirecionado para `/login`
- [ ] Verificar se não consegue mais acessar rotas protegidas
- [ ] Verificar se localStorage foi limpo

---

## 🏋️ Funcionalidades Principais

### Dashboard
- [ ] Acessar `/dashboard`
- [ ] Verificar se cards de métricas aparecem
- [ ] Verificar se sidebar funciona
- [ ] Verificar se header aparece corretamente
- [ ] Testar navegação entre seções

### Navegação
- [ ] Testar todos os links da sidebar
- [ ] Verificar se páginas carregam corretamente
- [ ] Testar menu mobile (redimensionar tela)
- [ ] Verificar se active state funciona nos links

### Perfil
- [ ] Acessar `/profile`
- [ ] Verificar se dados do usuário aparecem
- [ ] Tentar editar perfil (se implementado)

### Configurações
- [ ] Acessar `/settings`
- [ ] Verificar se opções aparecem
- [ ] Testar mudança de tema (se implementado)

---

## 🔒 Segurança

### Headers de Segurança
- [ ] Abrir DevTools → Network
- [ ] Recarregar página
- [ ] Verificar headers de resposta:
  - `Strict-Transport-Security`
  - `X-Frame-Options`
  - `X-Content-Type-Options`
  - `Content-Security-Policy`

### Sanitização
- [ ] Tentar registrar com nome contendo `<script>alert('xss')</script>`
- [ ] Verificar se script é removido
- [ ] Tentar email com caracteres especiais
- [ ] Verificar se é sanitizado

### Error Handling
- [ ] Desconectar internet
- [ ] Tentar fazer login
- [ ] Verificar se erro é exibido corretamente
- [ ] Reconectar e tentar novamente

---

## 📱 Responsividade

### Mobile (< 768px)
- [ ] Verificar se menu mobile aparece
- [ ] Testar abertura/fechamento do menu
- [ ] Verificar se cards se adaptam
- [ ] Testar formulários em mobile

### Tablet (768px - 1024px)
- [ ] Verificar layout
- [ ] Testar navegação
- [ ] Verificar se sidebar aparece/esconde

### Desktop (> 1024px)
- [ ] Verificar se sidebar está sempre visível
- [ ] Testar layout em tela grande
- [ ] Verificar espaçamentos

---

## 🎨 UI/UX

### Tema
- [ ] Verificar tema claro
- [ ] Verificar tema escuro
- [ ] Testar alternância de tema

### Feedback Visual
- [ ] Verificar loading states em botões
- [ ] Verificar toasts de sucesso/erro
- [ ] Verificar skeleton loaders
- [ ] Verificar estados de hover

### Acessibilidade
- [ ] Testar navegação por teclado (Tab)
- [ ] Verificar contraste de cores
- [ ] Testar com leitor de tela (se possível)
- [ ] Verificar labels em inputs

---

## 🐛 Casos de Erro

### Erros de Rede
- [ ] Desconectar internet durante login
- [ ] Verificar mensagem de erro
- [ ] Reconectar e verificar recuperação

### Erros de Validação
- [ ] Tentar login com email inválido
- [ ] Tentar senha muito curta
- [ ] Verificar mensagens de erro

### Token Expirado
- [ ] Fazer login
- [ ] Esperar token expirar (ou simular)
- [ ] Fazer requisição
- [ ] Verificar se refresh automático funciona

---

## 🚀 Performance

### Tempo de Carregamento
- [ ] Medir tempo de carregamento inicial
- [ ] Verificar se < 3 segundos
- [ ] Testar em conexão lenta (DevTools → Network → Slow 3G)

### Bundle Size
- [ ] Verificar tamanho do bundle no build
- [ ] Verificar se não há imports desnecessários

---

## ✅ Checklist de Deploy

### Antes do Deploy
- [ ] Todas as variáveis de ambiente configuradas
- [ ] Build local funciona sem erros
- [ ] Testes manuais passaram
- [ ] Documentação atualizada
- [ ] .env.example atualizado

### Configuração de Produção
- [ ] Configurar domínio
- [ ] Configurar SSL/HTTPS
- [ ] Configurar variáveis de ambiente no host
- [ ] Configurar Cognito para produção
- [ ] Configurar CORS no backend

### Pós-Deploy
- [ ] Testar login em produção
- [ ] Verificar se headers de segurança estão ativos
- [ ] Testar fluxo completo de registro
- [ ] Verificar logs de erro
- [ ] Monitorar performance

---

## 📊 Status Atual

**Última Atualização:** 2024-11-25

### Implementado ✅
- [x] Sistema de autenticação com Cognito
- [x] Proteção de rotas
- [x] Security headers
- [x] Error boundary
- [x] Logging estruturado
- [x] Sanitização de inputs
- [x] Refresh token automático

### Pendente ⏳
- [ ] Configurar Cognito no AWS
- [ ] Testar fluxo completo
- [ ] Implementar backend APIs
- [ ] Integrar com serviços de IA
- [ ] Implementar pagamentos
- [ ] Deploy em produção

### Próximos Passos 🎯
1. Configurar AWS Cognito
2. Testar autenticação completa
3. Implementar APIs do backend
4. Integrar funcionalidades de IA
5. Configurar pagamentos (Asaas)

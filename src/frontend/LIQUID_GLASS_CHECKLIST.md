# ✅ Checklist: Refatoração Liquid Glass Design

Checklist completo para migrar o frontend para o novo design system Liquid Glass.

## 📋 Fase 1: Fundação (Prioridade Alta)

### 1.1 Sistema de Cores
- [ ] Atualizar `lib/theme.ts` com paleta Liquid Glass
- [ ] Adicionar cores Apple (light/dark)
- [ ] Criar variáveis CSS para glassmorphism
- [ ] Adicionar cores de sombra e blur
- [ ] Testar contraste de acessibilidade

### 1.2 Variáveis CSS Globais
- [ ] Atualizar `app/globals.css` com novas variáveis
- [ ] Adicionar variáveis de blur (`--blur-sm`, `--blur-md`, etc)
- [ ] Adicionar variáveis de sombra
- [ ] Adicionar variáveis de border-radius
- [ ] Configurar transições globais

### 1.3 Tipografia
- [ ] Importar SF Pro Display (ou Inter como fallback)
- [ ] Configurar font weights (400, 500, 600, 700)
- [ ] Definir line-heights
- [ ] Configurar letter-spacing
- [ ] Atualizar classes de texto no Tailwind

### 1.4 Utilitários CSS
- [ ] Criar classes `.glass-*` (light, surface, etc)
- [ ] Criar classes `.blur-*` (sm, md, lg, xl)
- [ ] Criar classes `.shadow-glass-*`
- [ ] Criar classes `.rounded-glass-*`
- [ ] Criar classes `.transition-glass`

## 📋 Fase 2: Componentes Base (Prioridade Alta)

### 2.1 Button Component
- [x] Criar `Button` com estilo liquid
- [x] Variantes: primary, secondary, ghost, danger
- [x] Adicionar hover effects (scale, shadow)
- [ ] Adicionar loading state
- [x] Adicionar disabled state
- [x] Testar acessibilidade (focus, keyboard)

### 2.2 Card Component
- [x] Refatorar `Card` para glass effect
- [x] Adicionar backdrop-filter blur
- [x] Configurar borders translúcidos
- [ ] Adicionar hover lift effect (usar className="hover-lift")
- [ ] Criar variantes (default, elevated, flat)
- [x] Testar em light/dark mode

### 2.3 Input Component
- [x] Refatorar `Input` para glass style
- [x] Adicionar focus states com glow
- [x] Configurar placeholder styles
- [ ] Adicionar error states
- [ ] Adicionar success states
- [x] Testar acessibilidade

### 2.4 Badge Component
- [x] Criar badges floating
- [x] Variantes: success, warning, danger, info, default, secondary, outline
- [ ] Adicionar ícones opcionais
- [x] Configurar animações sutis
- [x] Testar legibilidade

### 2.5 Modal/Dialog Component
- [x] Criar modal com glass effect
- [x] Adicionar overlay com blur
- [x] Implementar animação de entrada (slide + fade)
- [x] Adicionar animação de saída
- [x] Configurar backdrop click to close
- [x] Testar acessibilidade (focus trap, ESC)

### 2.6 Textarea Component
- [x] Criar Textarea com glass style
- [x] Usar classe input-glass
- [x] Adicionar resize vertical
- [x] Testar disabled state

## 📋 Fase 3: Componentes de Layout (Prioridade Média)

### 3.1 Navigation
- [ ] Refatorar navbar com glass effect
- [ ] Adicionar blur no scroll
- [ ] Implementar sticky behavior
- [ ] Adicionar animações de transição
- [ ] Testar responsividade

### 3.2 Sidebar
- [ ] Criar sidebar com glass effect
- [ ] Adicionar animações de abertura/fechamento
- [ ] Implementar overlay em mobile
- [ ] Configurar active states
- [ ] Testar acessibilidade

### 3.3 Header
- [ ] Refatorar header com glass effect
- [ ] Adicionar gradiente sutil
- [ ] Implementar scroll effects
- [ ] Adicionar breadcrumbs estilizados
- [ ] Testar responsividade

### 3.4 Footer
- [ ] Refatorar footer com glass effect
- [ ] Adicionar links estilizados
- [ ] Configurar hover states
- [ ] Testar responsividade

## 📋 Fase 4: Componentes de Formulário (Prioridade Média)

### 4.1 Form Components
- [ ] Refatorar `Input` (text, email, password)
- [ ] Refatorar `Textarea`
- [ ] Refatorar `Select` com glass dropdown
- [ ] Refatorar `Checkbox` com animação
- [ ] Refatorar `Radio` com animação
- [ ] Refatorar `Switch/Toggle`

### 4.2 Form Validation
- [ ] Estilizar mensagens de erro
- [ ] Estilizar mensagens de sucesso
- [ ] Adicionar ícones de validação
- [ ] Implementar animações de erro
- [ ] Testar acessibilidade

### 4.3 Form Layouts
- [ ] Criar layouts de formulário consistentes
- [ ] Adicionar espaçamento adequado
- [ ] Configurar labels estilizados
- [ ] Adicionar helper text
- [ ] Testar responsividade

## 📋 Fase 5: Componentes Específicos (Prioridade Média)

### 5.1 Workout Components
- [ ] Refatorar `ExerciseCard` com glass effect
- [ ] Adicionar hover animations
- [ ] Estilizar badges de dificuldade
- [ ] Adicionar progress indicators
- [ ] Testar interatividade

### 5.2 Nutrition Components
- [ ] Refatorar `MacrosChart` com glass containers
- [ ] Estilizar gráficos com cores do tema
- [ ] Adicionar animações de entrada
- [ ] Refatorar `MealCard`
- [ ] Testar legibilidade

### 5.3 Profile Components
- [ ] Refatorar `ProfileCard` com glass effect
- [ ] Estilizar avatar com border glass
- [ ] Adicionar hover effects
- [ ] Refatorar stats cards
- [ ] Testar responsividade

### 5.4 Dashboard Components
- [ ] Refatorar cards de estatísticas
- [ ] Adicionar animações de loading
- [ ] Estilizar gráficos e charts
- [ ] Implementar skeleton loaders glass
- [ ] Testar performance

## 📋 Fase 6: Componentes de Feedback (Prioridade Baixa)

### 6.1 Toast/Notifications
- [ ] Criar toast com glass effect
- [ ] Adicionar animações de entrada/saída
- [ ] Variantes: success, warning, error, info
- [ ] Configurar auto-dismiss
- [ ] Testar acessibilidade

### 6.2 Alert/Banner
- [ ] Criar alert com glass effect
- [ ] Variantes: info, warning, error, success
- [ ] Adicionar ícones
- [ ] Configurar dismiss button
- [ ] Testar responsividade

### 6.3 Loading States
- [ ] Criar spinner glass
- [ ] Criar skeleton loaders glass
- [ ] Criar progress bars glass
- [ ] Adicionar animações suaves
- [ ] Testar performance

### 6.4 Empty States
- [ ] Criar empty states estilizados
- [ ] Adicionar ilustrações/ícones
- [ ] Configurar CTAs
- [ ] Testar responsividade

## 📋 Fase 7: Animações e Transições (Prioridade Baixa)

### 7.1 Page Transitions
- [ ] Implementar fade in/out entre páginas
- [ ] Adicionar slide animations
- [ ] Configurar loading states
- [ ] Testar performance
- [ ] Respeitar `prefers-reduced-motion`

### 7.2 Micro-interactions
- [ ] Adicionar hover effects em botões
- [ ] Adicionar ripple effects
- [ ] Implementar scale animations
- [ ] Adicionar glow effects
- [ ] Testar performance

### 7.3 Scroll Animations
- [ ] Implementar fade in on scroll
- [ ] Adicionar parallax effects sutis
- [ ] Configurar reveal animations
- [ ] Testar performance
- [ ] Respeitar `prefers-reduced-motion`

## 📋 Fase 8: Páginas (Prioridade Baixa)

### 8.1 Landing Page
- [ ] Refatorar hero section com glass
- [ ] Adicionar mesh gradient background
- [ ] Estilizar CTAs
- [ ] Adicionar animações de scroll
- [ ] Testar responsividade

### 8.2 Dashboard
- [ ] Refatorar layout com glass cards
- [ ] Estilizar widgets
- [ ] Adicionar animações de loading
- [ ] Implementar grid responsivo
- [ ] Testar performance

### 8.3 Profile Page
- [ ] Refatorar header com glass
- [ ] Estilizar tabs
- [ ] Adicionar animações de transição
- [ ] Testar responsividade

### 8.4 Settings Page
- [ ] Refatorar sections com glass cards
- [ ] Estilizar form controls
- [ ] Adicionar save indicators
- [ ] Testar acessibilidade

### 8.5 Auth Pages (Login/Register)
- [ ] Refatorar forms com glass
- [ ] Adicionar background gradient/mesh
- [ ] Estilizar social login buttons
- [ ] Adicionar animações
- [ ] Testar acessibilidade

## 📋 Fase 9: Otimização (Prioridade Baixa)

### 9.1 Performance
- [ ] Otimizar animações (GPU acceleration)
- [ ] Reduzir repaints/reflows
- [ ] Lazy load componentes pesados
- [ ] Otimizar imagens
- [ ] Testar Core Web Vitals

### 9.2 Acessibilidade
- [ ] Auditar contraste de cores
- [ ] Testar navegação por teclado
- [ ] Testar com leitores de tela
- [ ] Adicionar ARIA labels
- [ ] Testar com ferramentas (Lighthouse, axe)

### 9.3 Responsividade
- [ ] Testar em mobile (320px - 768px)
- [ ] Testar em tablet (768px - 1024px)
- [ ] Testar em desktop (1024px+)
- [ ] Testar em telas grandes (1920px+)
- [ ] Testar orientação landscape/portrait

### 9.4 Dark Mode
- [ ] Testar todos os componentes em dark mode
- [ ] Ajustar opacidades e blur
- [ ] Verificar contraste
- [ ] Testar transições de tema
- [ ] Adicionar toggle animado

## 📋 Fase 10: Documentação (Prioridade Baixa)

### 10.1 Storybook/Showcase
- [ ] Criar showcase de componentes
- [ ] Documentar variantes
- [ ] Adicionar exemplos de uso
- [ ] Documentar props
- [ ] Adicionar playground interativo

### 10.2 Guias
- [ ] Criar guia de uso do design system
- [ ] Documentar padrões de layout
- [ ] Criar guia de animações
- [ ] Documentar boas práticas
- [ ] Criar guia de acessibilidade

### 10.3 Assets
- [ ] Exportar paleta de cores
- [ ] Criar biblioteca de ícones
- [ ] Documentar tipografia
- [ ] Criar templates de componentes
- [ ] Exportar para Figma (opcional)

## 🎯 Métricas de Sucesso

### Performance
- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Cumulative Layout Shift < 0.1

### Acessibilidade
- [ ] WCAG 2.1 Level AA compliance
- [ ] Lighthouse Accessibility Score > 95
- [ ] Navegação por teclado 100% funcional
- [ ] Compatível com leitores de tela

### UX
- [ ] Animações suaves (60fps)
- [ ] Feedback visual em todas as interações
- [ ] Loading states em todas as ações assíncronas
- [ ] Mensagens de erro claras e úteis

## 📝 Notas

- Priorizar componentes mais usados primeiro
- Testar em light e dark mode após cada mudança
- Manter compatibilidade com componentes existentes
- Documentar mudanças significativas
- Fazer commits pequenos e frequentes
- Revisar acessibilidade em cada fase

## 🚀 Quick Wins (Começar por aqui)

1. ✅ Atualizar paleta de cores (Fase 1.1)
2. ✅ Criar variáveis CSS globais (Fase 1.2)
3. ✅ Refatorar Card component (Fase 2.2)
4. ✅ Refatorar Button component (Fase 2.1)
5. ✅ Criar utilitários CSS (Fase 1.4)

Estes 5 itens darão a base para todo o resto do design system!

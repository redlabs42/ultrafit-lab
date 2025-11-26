# Sistema de Tema UltraFit

Sistema de cores unificado e consistente para o UltraFit, com suporte completo a modo claro e escuro.

## 📁 Arquivos Principais

- **`lib/theme.ts`** - Definição das cores do tema (fonte da verdade)
- **`lib/theme-utils.ts`** - Utilitários e classes pré-definidas
- **`hooks/useTheme.ts`** - Hook para acessar o tema em componentes
- **`app/globals.css`** - Variáveis CSS do tema
- **`tailwind.config.ts`** - Configuração do Tailwind com cores do tema

## 🎨 Paleta de Cores

### Light Mode
```typescript
{
  bg: "#F9FAFB",              // Background principal
  bgAlt: "#E5E7EB",           // Background alternativo
  text: "#020617",            // Texto principal
  textMuted: "#6B7280",       // Texto secundário
  primary: "#1D4ED8",         // Azul (ações principais)
  primaryHover: "#1E40AF",    // Azul escuro (hover)
  accent: "#A3E635",          // Verde lima (destaques)
  success: "#22C55E",         // Verde (sucesso)
  warning: "#FACC15",         // Amarelo (avisos)
  danger: "#EF4444",          // Vermelho (erros)
}
```

### Dark Mode
```typescript
{
  bg: "#020617",              // Background principal
  bgAlt: "#020617",           // Background alternativo
  text: "#E5E7EB",            // Texto principal
  textMuted: "#94A3B8",       // Texto secundário
  primary: "#60A5FA",         // Azul claro (ações principais)
  primaryHover: "#3B82F6",    // Azul (hover)
  accent: "#BEF264",          // Verde lima claro (destaques)
  success: "#22C55E",         // Verde (sucesso)
  warning: "#EAB308",         // Amarelo escuro (avisos)
  danger: "#F97316",          // Laranja (erros)
}
```

## 🚀 Como Usar

### 1. Classes Tailwind (Recomendado)

```tsx
// Backgrounds
<div className="bg-background">...</div>
<div className="bg-primary">...</div>
<div className="bg-success/10">...</div> // Com opacidade

// Texto
<p className="text-foreground">Texto principal</p>
<p className="text-muted-foreground">Texto secundário</p>
<p className="text-destructive">Erro</p>

// Borders
<div className="border-primary">...</div>
<div className="border-destructive/20">...</div>
```

### 2. Utilitários Pré-definidos

```tsx
import { themeColors, difficultyColors, statusColors } from "@/lib/theme-utils";

// Dificuldade de exercícios
<Badge className={difficultyColors.beginner}>Iniciante</Badge>
<Badge className={difficultyColors.intermediate}>Intermediário</Badge>
<Badge className={difficultyColors.advanced}>Avançado</Badge>

// Status
<Badge className={statusColors.active}>Ativo</Badge>
<Badge className={statusColors.pending}>Pendente</Badge>
<Badge className={statusColors.error}>Erro</Badge>

// Cores gerais
<div className={themeColors.success}>Sucesso!</div>
<div className={themeColors.warning}>Atenção!</div>
```

### 3. Hook useTheme

```tsx
import { useTheme } from "@/hooks/useTheme";

function MyComponent() {
  const { colors, isDark, setTheme } = useTheme();
  
  return (
    <div style={{ backgroundColor: colors.bg }}>
      <p style={{ color: colors.text }}>
        Modo: {isDark ? "Escuro" : "Claro"}
      </p>
      <button onClick={() => setTheme(isDark ? "light" : "dark")}>
        Alternar Tema
      </button>
    </div>
  );
}
```

### 4. Acesso Direto ao Tema

```tsx
import { theme } from "@/lib/theme";

// Acessar cores diretamente
const primaryColor = theme.light.primary;
const darkBg = theme.dark.bg;
```

## 📋 Classes Disponíveis

### Backgrounds
- `bg-background` - Background principal (#F9FAFB / #020617)
- `bg-background-alt` - Background alternativo (#E5E7EB / #020617)
- `bg-card` - Background de cards
- `bg-primary` - Azul (#1D4ED8 / #60A5FA)
- `bg-accent` - Verde lima (#A3E635 / #BEF264)
- `bg-success` - Verde (#22C55E)
- `bg-warning` - Amarelo (#FACC15 / #EAB308)
- `bg-destructive` - Vermelho/Laranja (#EF4444 / #F97316)
- `bg-muted` - Cinza suave

### Texto
- `text-foreground` - Texto principal
- `text-muted-foreground` - Texto secundário
- `text-primary` - Azul
- `text-accent` - Verde lima
- `text-success` - Verde
- `text-warning` - Amarelo
- `text-destructive` - Vermelho

### Borders
- `border-border` - Border padrão
- `border-primary` - Border azul
- `border-success` - Border verde
- `border-warning` - Border amarelo
- `border-destructive` - Border vermelho

### Opacidade
Adicione `/[número]` para opacidade:
- `bg-success/10` - 10% de opacidade
- `bg-destructive/20` - 20% de opacidade
- `border-primary/50` - 50% de opacidade

## 🎯 Casos de Uso Comuns

### Mensagens de Erro em Formulários
```tsx
{errors.email && (
  <p className="text-sm text-destructive">{errors.email.message}</p>
)}
```

### Badges de Status
```tsx
import { statusColors } from "@/lib/theme-utils";

<Badge className={statusColors.active}>Ativo</Badge>
<Badge className={statusColors.error}>Erro</Badge>
```

### Cards com Background Suave
```tsx
<Card className="bg-card backdrop-blur-sm">
  <CardContent>...</CardContent>
</Card>
```

### Botões de Ação
```tsx
<Button className="bg-primary hover:bg-primary/90">
  Salvar
</Button>

<Button className="bg-destructive hover:bg-destructive/90">
  Excluir
</Button>
```

### Alertas e Notificações
```tsx
// Sucesso
<div className="bg-success/10 text-success border border-success/20 rounded-lg p-4">
  Operação realizada com sucesso!
</div>

// Aviso
<div className="bg-warning/10 text-warning border border-warning/20 rounded-lg p-4">
  Atenção: Verifique os dados
</div>

// Erro
<div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-lg p-4">
  Erro ao processar solicitação
</div>
```

## 🔄 Migração

Para migrar componentes existentes, consulte `THEME_MIGRATION.md`.

Script de migração automática:
```bash
cd src/frontend
bash scripts/migrate-colors.sh
```

## ✅ Boas Práticas

1. **Sempre use variáveis do tema** - Nunca use cores hardcoded como `#FF0000` ou `bg-red-500`
2. **Prefira classes Tailwind** - Use `bg-primary` ao invés de estilos inline
3. **Use opacidade para variações** - `bg-success/10` ao invés de criar novas cores
4. **Teste em ambos os modos** - Sempre verifique light e dark mode
5. **Use utilitários** - Aproveite `theme-utils.ts` para padrões comuns
6. **Seja consistente** - Use as mesmas cores para os mesmos propósitos

## 🎨 Semântica das Cores

- **Primary (Azul)** - Ações principais, links, botões primários
- **Accent (Verde Lima)** - Destaques, elementos de destaque, gamificação
- **Success (Verde)** - Confirmações, sucessos, estados positivos
- **Warning (Amarelo)** - Avisos, atenção, estados intermediários
- **Destructive (Vermelho/Laranja)** - Erros, exclusões, ações destrutivas
- **Muted** - Elementos secundários, desabilitados, backgrounds sutis

## 📚 Recursos

- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

# Guia de Migração de Cores

Este documento descreve como migrar componentes para usar o novo sistema de tema unificado.

## Novo Sistema de Cores

O tema agora está centralizado em `lib/theme.ts` e usa variáveis CSS definidas em `app/globals.css`.

### Cores Principais

#### Light Mode
- **Background**: `#F9FAFB` (cinza muito claro)
- **Background Alt**: `#E5E7EB` (cinza claro)
- **Text**: `#020617` (quase preto)
- **Text Muted**: `#6B7280` (cinza médio)
- **Primary**: `#1D4ED8` (azul)
- **Primary Hover**: `#1E40AF` (azul escuro)
- **Accent**: `#A3E635` (verde lima)
- **Success**: `#22C55E` (verde)
- **Warning**: `#FACC15` (amarelo)
- **Danger**: `#EF4444` (vermelho)

#### Dark Mode
- **Background**: `#020617` (quase preto)
- **Text**: `#E5E7EB` (cinza claro)
- **Text Muted**: `#94A3B8` (cinza médio)
- **Primary**: `#60A5FA` (azul claro)
- **Primary Hover**: `#3B82F6` (azul)
- **Accent**: `#BEF264` (verde lima claro)
- **Success**: `#22C55E` (verde)
- **Warning**: `#EAB308` (amarelo escuro)
- **Danger**: `#F97316` (laranja)

## Como Migrar

### 1. Substituir Cores Hardcoded

❌ **Antes:**
```tsx
<div className="bg-blue-500 text-white">
  <p className="text-red-500">Erro</p>
</div>
```

✅ **Depois:**
```tsx
<div className="bg-primary text-primary-foreground">
  <p className="text-destructive">Erro</p>
</div>
```

### 2. Usar Utilitários de Tema

Importe de `lib/theme-utils.ts`:

```tsx
import { themeColors, difficultyColors, statusColors } from "@/lib/theme-utils";

// Usar classes pré-definidas
<Badge className={difficultyColors.beginner}>Iniciante</Badge>
<div className={themeColors.success}>Sucesso!</div>
```

### 3. Usar Hook de Tema

Para acessar cores programaticamente:

```tsx
import { useTheme } from "@/hooks/useTheme";

function MyComponent() {
  const { colors, isDark } = useTheme();
  
  return (
    <div style={{ backgroundColor: colors.bg }}>
      {/* conteúdo */}
    </div>
  );
}
```

## Mapeamento de Cores

### Cores de Texto
| Antes | Depois |
|-------|--------|
| `text-red-500` | `text-destructive` |
| `text-red-600` | `text-destructive` |
| `text-green-600` | `text-success` |
| `text-yellow-800` | `text-warning` |
| `text-blue-500` | `text-primary` |
| `text-gray-500` | `text-muted-foreground` |

### Cores de Background
| Antes | Depois |
|-------|--------|
| `bg-red-100 dark:bg-red-900` | `bg-destructive/10` |
| `bg-green-100 dark:bg-green-900` | `bg-success/10` |
| `bg-yellow-100 dark:bg-yellow-900` | `bg-warning/10` |
| `bg-blue-500` | `bg-primary` |
| `bg-gray-100` | `bg-muted` |

### Badges e Status
| Antes | Depois |
|-------|--------|
| `bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200` | `bg-success/10 text-success` |
| `bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200` | `bg-warning/10 text-warning` |
| `bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200` | `bg-destructive/10 text-destructive` |

## Classes Tailwind Disponíveis

### Backgrounds
- `bg-background` - Background principal
- `bg-background-alt` - Background alternativo
- `bg-card` - Background de cards
- `bg-primary` - Cor primária (azul)
- `bg-accent` - Cor de destaque (verde lima)
- `bg-success` - Verde
- `bg-warning` - Amarelo
- `bg-destructive` - Vermelho/laranja

### Text
- `text-foreground` - Texto principal
- `text-muted-foreground` - Texto secundário
- `text-primary` - Texto azul
- `text-accent` - Texto verde lima
- `text-success` - Texto verde
- `text-warning` - Texto amarelo
- `text-destructive` - Texto vermelho

### Opacidade
Use `/10`, `/20`, etc. para opacidade:
- `bg-success/10` - Verde com 10% de opacidade
- `bg-destructive/20` - Vermelho com 20% de opacidade

## Componentes Já Migrados

- ✅ `ExerciseCard.tsx` - Usa `difficultyColors` de theme-utils
- ✅ `MacrosChart.tsx` - Usa cores do tema (primary, accent, warning)

## Componentes Pendentes

Componentes que ainda usam cores hardcoded:

### Formulários (mensagens de erro)
- `ProfileForm.tsx` - `text-red-500` → `text-destructive`
- `GeneratePlanForm.tsx` (nutrition) - `text-red-500` → `text-destructive`
- `GeneratePlanForm.tsx` (workout) - `text-red-500` → `text-destructive`
- `ConfirmEmailForm.tsx` - `text-red-500` → `text-destructive`
- `LoginForm.tsx` - `text-red-500` → `text-destructive`
- `AccountSettings.tsx` - `text-red-500` → `text-destructive`
- `PaymentForm.tsx` - `text-red-500` → `text-destructive`

### Componentes de UI
- `UserMenu.tsx` - `text-red-600` → `text-destructive`
- `GenerationProgress.tsx` - `text-green-600` → `text-success`
- `GeneratedContent.tsx` - cores de badge → `bg-success/10 text-success`
- `SubscriptionStatus.tsx` - `bg-yellow-50` → `bg-warning/10`
- `AccountSettings.tsx` - `border-red-200` → `border-destructive/20`

## Dicas

1. **Sempre use variáveis do tema** ao invés de cores hardcoded
2. **Use opacidade** (`/10`, `/20`) para variações sutis
3. **Teste em ambos os modos** (light e dark) após mudanças
4. **Prefira classes Tailwind** sobre estilos inline quando possível
5. **Use theme-utils** para padrões comuns (dificuldade, status, etc.)

## Próximos Passos

1. Migrar todos os formulários para usar `text-destructive` em erros
2. Atualizar badges e status para usar cores do tema
3. Remover todas as referências a cores Tailwind hardcoded
4. Adicionar mais utilitários em `theme-utils.ts` conforme necessário

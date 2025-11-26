# 🌊 Liquid Glass Design System - UltraFit

Sistema de design inspirado no macOS com efeitos de vidro líquido, blur e animações suaves.

## 🎨 Princípios de Design

1. **Glassmorphism** - Superfícies translúcidas com blur
2. **Depth & Layers** - Hierarquia visual clara com sombras suaves
3. **Smooth Animations** - Transições fluidas e naturais
4. **Minimal & Clean** - Espaçamento generoso, tipografia clara
5. **Adaptive** - Funciona perfeitamente em light e dark mode

## 🎯 Características Principais

### Glassmorphism
- Background com opacidade (rgba)
- Backdrop blur (8px - 24px)
- Borders sutis com gradiente
- Sombras suaves e multicamadas

### Animações
- Hover states suaves (200-300ms)
- Scale transforms sutis (1.02 - 1.05)
- Fade in/out com opacity
- Slide animations para modais

### Tipografia
- Font: SF Pro (fallback: Inter, system-ui)
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Line height: 1.5 - 1.6
- Letter spacing: -0.01em para títulos

### Espaçamento
- Base: 4px (0.25rem)
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96
- Padding interno: 16-24px
- Gaps: 12-16px

## 🎨 Paleta de Cores (Fonte da Verdade)

### Light Mode
```typescript
{
  // Backgrounds
  bg: "#F5F5F7",              // Cinza Apple claro
  bgGlass: "rgba(255, 255, 255, 0.7)",  // Vidro branco
  bgGlassHover: "rgba(255, 255, 255, 0.85)",
  
  // Surfaces
  surface: "rgba(255, 255, 255, 0.6)",
  surfaceHover: "rgba(255, 255, 255, 0.8)",
  
  // Text
  text: "#1D1D1F",            // Quase preto
  textSecondary: "#6E6E73",   // Cinza médio
  textTertiary: "#86868B",    // Cinza claro
  
  // Primary (Azul Apple)
  primary: "#007AFF",
  primaryHover: "#0051D5",
  primarySoft: "rgba(0, 122, 255, 0.1)",
  
  // Accent (Verde)
  accent: "#34C759",
  accentHover: "#248A3D",
  accentSoft: "rgba(52, 199, 89, 0.1)",
  
  // Status
  success: "#34C759",
  warning: "#FF9500",
  danger: "#FF3B30",
  info: "#5AC8FA",
  
  // Borders
  border: "rgba(0, 0, 0, 0.1)",
  borderHover: "rgba(0, 0, 0, 0.2)",
  
  // Shadows
  shadow: "rgba(0, 0, 0, 0.1)",
  shadowMedium: "rgba(0, 0, 0, 0.15)",
  shadowLarge: "rgba(0, 0, 0, 0.2)",
}
```

### Dark Mode
```typescript
{
  // Backgrounds
  bg: "#000000",              // Preto puro
  bgGlass: "rgba(28, 28, 30, 0.7)",  // Vidro escuro
  bgGlassHover: "rgba(28, 28, 30, 0.85)",
  
  // Surfaces
  surface: "rgba(44, 44, 46, 0.6)",
  surfaceHover: "rgba(44, 44, 46, 0.8)",
  
  // Text
  text: "#F5F5F7",            // Branco suave
  textSecondary: "#98989D",   // Cinza médio
  textTertiary: "#636366",    // Cinza escuro
  
  // Primary (Azul Apple)
  primary: "#0A84FF",
  primaryHover: "#409CFF",
  primarySoft: "rgba(10, 132, 255, 0.15)",
  
  // Accent (Verde)
  accent: "#32D74B",
  accentHover: "#30DB75",
  accentSoft: "rgba(50, 215, 75, 0.15)",
  
  // Status
  success: "#32D74B",
  warning: "#FF9F0A",
  danger: "#FF453A",
  info: "#64D2FF",
  
  // Borders
  border: "rgba(255, 255, 255, 0.15)",
  borderHover: "rgba(255, 255, 255, 0.25)",
  
  // Shadows
  shadow: "rgba(0, 0, 0, 0.3)",
  shadowMedium: "rgba(0, 0, 0, 0.4)",
  shadowLarge: "rgba(0, 0, 0, 0.5)",
}
```

## 🧩 Componentes Base

### Card (Liquid Glass)
```tsx
<div className="glass-card">
  {/* Conteúdo */}
</div>

// CSS
.glass-card {
  background: var(--surface);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 
    0 4px 6px var(--shadow),
    0 1px 3px var(--shadow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  background: var(--surface-hover);
  border-color: var(--border-hover);
  transform: translateY(-2px);
  box-shadow: 
    0 12px 24px var(--shadow-medium),
    0 4px 8px var(--shadow);
}
```

### Button (Liquid)
```tsx
// Primary
<button className="btn-liquid-primary">
  Ação Principal
</button>

// Secondary
<button className="btn-liquid-secondary">
  Ação Secundária
</button>

// CSS
.btn-liquid-primary {
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  box-shadow: 0 2px 8px var(--primary-soft);
  transition: all 0.2s ease;
}

.btn-liquid-primary:hover {
  background: var(--primary-hover);
  transform: scale(1.02);
  box-shadow: 0 4px 12px var(--primary-soft);
}

.btn-liquid-primary:active {
  transform: scale(0.98);
}
```

### Input (Glass)
```tsx
<input className="input-glass" />

// CSS
.input-glass {
  background: var(--surface);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--text);
  transition: all 0.2s ease;
}

.input-glass:focus {
  background: var(--surface-hover);
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-soft);
  outline: none;
}
```

### Badge (Floating)
```tsx
<span className="badge-floating badge-success">
  Ativo
</span>

// CSS
.badge-floating {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  backdrop-filter: blur(12px);
  border: 1px solid transparent;
}

.badge-success {
  background: var(--success-soft);
  color: var(--success);
  border-color: var(--success);
}
```

## 📐 Layout Patterns

### Container Principal
```tsx
<div className="liquid-container">
  <div className="liquid-content">
    {/* Conteúdo */}
  </div>
</div>

// CSS
.liquid-container {
  min-height: 100vh;
  background: var(--bg);
  padding: 24px;
}

.liquid-content {
  max-width: 1200px;
  margin: 0 auto;
}
```

### Grid de Cards
```tsx
<div className="glass-grid">
  <div className="glass-card">Card 1</div>
  <div className="glass-card">Card 2</div>
  <div className="glass-card">Card 3</div>
</div>

// CSS
.glass-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
```

### Modal (Floating)
```tsx
<div className="modal-overlay">
  <div className="modal-glass">
    {/* Conteúdo */}
  </div>
</div>

// CSS
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-glass {
  background: var(--surface);
  backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  box-shadow: 
    0 20px 40px var(--shadow-large),
    0 8px 16px var(--shadow-medium);
  animation: modalSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

## 🎭 Animações

### Hover Effects
```css
/* Scale up suave */
.hover-scale {
  transition: transform 0.2s ease;
}
.hover-scale:hover {
  transform: scale(1.02);
}

/* Lift up */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px var(--shadow-medium);
}

/* Glow */
.hover-glow {
  transition: all 0.3s ease;
}
.hover-glow:hover {
  box-shadow: 0 0 20px var(--primary-soft);
}
```

### Loading States
```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.loading-shimmer {
  background: linear-gradient(
    90deg,
    var(--surface) 0%,
    var(--surface-hover) 50%,
    var(--surface) 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.4s ease-out;
}
```

## 🔧 Utilitários CSS

```css
/* Blur utilities */
.blur-sm { backdrop-filter: blur(8px); }
.blur-md { backdrop-filter: blur(16px); }
.blur-lg { backdrop-filter: blur(24px); }
.blur-xl { backdrop-filter: blur(40px); }

/* Glass utilities */
.glass-light { background: var(--bg-glass); }
.glass-surface { background: var(--surface); }

/* Border radius */
.rounded-glass { border-radius: 16px; }
.rounded-glass-lg { border-radius: 20px; }
.rounded-glass-xl { border-radius: 24px; }

/* Shadows */
.shadow-glass {
  box-shadow: 
    0 4px 6px var(--shadow),
    0 1px 3px var(--shadow);
}

.shadow-glass-lg {
  box-shadow: 
    0 12px 24px var(--shadow-medium),
    0 4px 8px var(--shadow);
}

/* Transitions */
.transition-glass {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 📱 Responsividade

```css
/* Mobile first */
.glass-card {
  padding: 16px;
  border-radius: 12px;
}

/* Tablet */
@media (min-width: 768px) {
  .glass-card {
    padding: 20px;
    border-radius: 16px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .glass-card {
    padding: 24px;
    border-radius: 20px;
  }
}
```

## 🎨 Gradientes

```css
/* Gradient overlays */
.gradient-primary {
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-hover) 100%
  );
}

.gradient-accent {
  background: linear-gradient(
    135deg,
    var(--accent) 0%,
    var(--accent-hover) 100%
  );
}

/* Mesh gradient background */
.mesh-gradient {
  background: 
    radial-gradient(at 40% 20%, var(--primary-soft) 0px, transparent 50%),
    radial-gradient(at 80% 0%, var(--accent-soft) 0px, transparent 50%),
    radial-gradient(at 0% 50%, var(--primary-soft) 0px, transparent 50%),
    radial-gradient(at 80% 50%, var(--accent-soft) 0px, transparent 50%),
    var(--bg);
}
```

## 🎯 Acessibilidade

- Contraste mínimo: 4.5:1 para texto normal
- Contraste mínimo: 3:1 para texto grande
- Focus states visíveis com outline
- Animações respeitam `prefers-reduced-motion`
- Suporte a leitores de tela

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 📚 Referências

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Glassmorphism](https://hype4.academy/tools/glassmorphism-generator)
- [macOS Design Patterns](https://developer.apple.com/design/human-interface-guidelines/macos)

/**
 * Liquid Glass Design System - Paleta de Cores
 * Inspirado no macOS com efeitos de vidro líquido
 *
 * Esta é a FONTE DA VERDADE para todas as cores do sistema
 */
export const theme = {
  light: {
    // Backgrounds
    bg: "#F5F5F7", // Cinza Apple claro
    bgGlass: "rgba(255, 255, 255, 0.7)", // Vidro branco
    bgGlassHover: "rgba(255, 255, 255, 0.85)",

    // Surfaces
    surface: "rgba(255, 255, 255, 0.6)",
    surfaceHover: "rgba(255, 255, 255, 0.8)",

    // Text
    text: "#1D1D1F", // Quase preto
    textSecondary: "#6E6E73", // Cinza médio
    textTertiary: "#86868B", // Cinza claro

    // Primary (Azul Apple)
    primary: "#007AFF",
    primaryHover: "#0051D5",
    primarySoft: "rgba(0, 122, 255, 0.1)",
    primaryForeground: "#FFFFFF",

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

    // Legacy (manter compatibilidade)
    bgAlt: "#E5E7EB",
    card: "rgba(255, 255, 255, 0.6)",
    cardBorder: "rgba(0, 0, 0, 0.1)",
    textMuted: "#6E6E73",
  },
  dark: {
    // Backgrounds
    bg: "#000000", // Preto puro
    bgGlass: "rgba(28, 28, 30, 0.7)", // Vidro escuro
    bgGlassHover: "rgba(28, 28, 30, 0.85)",

    // Surfaces
    surface: "rgba(44, 44, 46, 0.6)",
    surfaceHover: "rgba(44, 44, 46, 0.8)",

    // Text
    text: "#F5F5F7", // Branco suave
    textSecondary: "#98989D", // Cinza médio
    textTertiary: "#636366", // Cinza escuro

    // Primary (Azul Apple)
    primary: "#0A84FF",
    primaryHover: "#409CFF",
    primarySoft: "rgba(10, 132, 255, 0.15)",
    primaryForeground: "#000000",

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

    // Legacy (manter compatibilidade)
    bgAlt: "#1C1C1E",
    card: "rgba(44, 44, 46, 0.6)",
    cardBorder: "rgba(255, 255, 255, 0.15)",
    textMuted: "#98989D",
  },
} as const;

/**
 * Converte cor hex para HSL
 */
function hexToHSL(hex: string): string {
  // Remove o # se existir
  hex = hex.replace(/^#/, "");

  // Converte hex para RGB
  const r = Number.parseInt(hex.substring(0, 2), 16) / 255;
  const g = Number.parseInt(hex.substring(2, 4), 16) / 255;
  const b = Number.parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Gera variáveis CSS para o tema
 */
export function generateCSSVariables() {
  return {
    light: {
      "--background": hexToHSL(theme.light.bg),
      "--background-alt": hexToHSL(theme.light.bgAlt),
      "--foreground": hexToHSL(theme.light.text),
      "--card": "0 0% 100%", // white com opacidade aplicada via rgba
      "--card-foreground": hexToHSL(theme.light.text),
      "--popover": "0 0% 100%",
      "--popover-foreground": hexToHSL(theme.light.text),
      "--primary": hexToHSL(theme.light.primary),
      "--primary-foreground": hexToHSL(theme.light.primaryForeground),
      "--secondary": hexToHSL(theme.light.primarySoft),
      "--secondary-foreground": hexToHSL(theme.light.primary),
      "--muted": hexToHSL(theme.light.bgAlt),
      "--muted-foreground": hexToHSL(theme.light.textMuted),
      "--accent": hexToHSL(theme.light.accent),
      "--accent-foreground": hexToHSL(theme.light.text),
      "--destructive": hexToHSL(theme.light.danger),
      "--destructive-foreground": hexToHSL(theme.light.primaryForeground),
      "--border": "214 32% 91%", // derivado de cardBorder
      "--input": hexToHSL(theme.light.bgAlt),
      "--ring": hexToHSL(theme.light.primary),
      "--success": hexToHSL(theme.light.success),
      "--warning": hexToHSL(theme.light.warning),
    },
    dark: {
      "--background": hexToHSL(theme.dark.bg),
      "--background-alt": hexToHSL(theme.dark.bgAlt),
      "--foreground": hexToHSL(theme.dark.text),
      "--card": "222 47% 11%", // slate-900 com opacidade aplicada via rgba
      "--card-foreground": hexToHSL(theme.dark.text),
      "--popover": "222 47% 11%",
      "--popover-foreground": hexToHSL(theme.dark.text),
      "--primary": hexToHSL(theme.dark.primary),
      "--primary-foreground": hexToHSL(theme.dark.primaryForeground),
      "--secondary": "217 91% 60%", // derivado de primarySoft
      "--secondary-foreground": hexToHSL(theme.dark.text),
      "--muted": hexToHSL(theme.dark.bgAlt),
      "--muted-foreground": hexToHSL(theme.dark.textMuted),
      "--accent": hexToHSL(theme.dark.accent),
      "--accent-foreground": hexToHSL(theme.dark.text),
      "--destructive": hexToHSL(theme.dark.danger),
      "--destructive-foreground": hexToHSL(theme.dark.text),
      "--border": "215 16% 47%", // derivado de cardBorder
      "--input": hexToHSL(theme.dark.bgAlt),
      "--ring": hexToHSL(theme.dark.primary),
      "--success": hexToHSL(theme.dark.success),
      "--warning": hexToHSL(theme.dark.warning),
    },
  };
}

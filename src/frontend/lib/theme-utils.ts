/**
 * Utilitários para trabalhar com o tema
 * Use estas classes ao invés de cores hardcoded
 */

export const themeColors = {
    // Backgrounds
    bg: "bg-background",
    bgAlt: "bg-background-alt",

    // Text
    text: "text-foreground",
    textMuted: "text-muted-foreground",

    // Primary (azul)
    primary: "bg-primary text-primary-foreground",
    primaryText: "text-primary",
    primaryBorder: "border-primary",
    primaryHover: "hover:bg-primary/90",

    // Accent (verde lima)
    accent: "bg-accent text-accent-foreground",
    accentText: "text-accent",
    accentBorder: "border-accent",

    // Success (verde)
    success: "bg-success text-success-foreground",
    successText: "text-success",
    successBorder: "border-success",
    successSoft: "bg-success/10 text-success",

    // Warning (amarelo)
    warning: "bg-warning text-warning-foreground",
    warningText: "text-warning",
    warningBorder: "border-warning",
    warningSoft: "bg-warning/10 text-warning",

    // Danger/Destructive (vermelho)
    danger: "bg-destructive text-destructive-foreground",
    dangerText: "text-destructive",
    dangerBorder: "border-destructive",
    dangerSoft: "bg-destructive/10 text-destructive",

    // Card
    card: "bg-card text-card-foreground border-border",

    // Muted
    muted: "bg-muted text-muted-foreground",
} as const;

/**
 * Classes de dificuldade para exercícios
 */
export const difficultyColors = {
    beginner: "bg-success/10 text-success border-success/20",
    intermediate: "bg-warning/10 text-warning border-warning/20",
    advanced: "bg-destructive/10 text-destructive border-destructive/20",
} as const;

/**
 * Classes de status
 */
export const statusColors = {
    active: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    inactive: "bg-muted text-muted-foreground",
    error: "bg-destructive/10 text-destructive",
} as const;

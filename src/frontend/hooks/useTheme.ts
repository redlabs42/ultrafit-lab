import { useTheme as useNextTheme } from "next-themes";
import { theme } from "@/lib/theme";

export function useTheme() {
  const { theme: currentTheme, setTheme, systemTheme } = useNextTheme();

  const resolvedTheme = currentTheme === "system" ? systemTheme : currentTheme;
  const isDark = resolvedTheme === "dark";

  const colors = isDark ? theme.dark : theme.light;

  return {
    theme: currentTheme,
    resolvedTheme,
    isDark,
    setTheme,
    colors,
  };
}

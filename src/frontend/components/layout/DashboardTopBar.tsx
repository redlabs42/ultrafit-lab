"use client";

import { Moon, Sun } from "lucide-react";
import { NotificationBell } from "@/components/navigation/NotificationBell";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function DashboardTopBar() {
  const { setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-background/60 backdrop-blur-xl border border-white/10 shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={cn(
            "relative h-9 w-9 rounded-full transition-all duration-300",
            "hover:bg-primary/10 hover:text-primary hover:scale-110",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          )}
          aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
        >
          <div className="relative w-5 h-5">
            <Sun
              className={cn(
                "absolute inset-0 h-5 w-5 transition-all duration-500 ease-spring",
                isDark
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100",
              )}
            />
            <Moon
              className={cn(
                "absolute inset-0 h-5 w-5 transition-all duration-500 ease-spring",
                isDark
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0",
              )}
            />
          </div>
        </Button>

        <NotificationBell />
      </div>
    </div>
  );
}

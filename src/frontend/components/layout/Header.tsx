"use client";

import Link from "next/link";
import { Moon, Sun, Sparkles } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { UserMenu } from "@/components/navigation/UserMenu";
import { NotificationBell } from "@/components/navigation/NotificationBell";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function Header() {
  const { isAuthenticated } = useAuthStore();
  const { setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 w-full p-4">
      <div className="mx-auto flex h-16 items-center justify-between rounded-3xl border border-white/10 bg-background/60 px-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-background/70">
        {/* Logo e Navegação */}
        <div className="flex items-center gap-6">
          {isAuthenticated && <MobileNav />}

          <Link
            href={isAuthenticated ? "/dashboard" : "/"}
            className="group flex items-center space-x-2 transition-all hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-r from-primary to-accent p-2 rounded-lg shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ultrafit Lab
            </span>
          </Link>

          {/* Navegação Desktop - apenas quando logado */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1 ml-4">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-sm font-medium rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-sm font-medium rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Link href="/workout/plan">Treinos</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-sm font-medium rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Link href="/nutrition">Nutrição</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-sm font-medium rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Link href="/progress">Progresso</Link>
              </Button>
            </nav>
          )}
        </div>

        {/* Ações do Header */}
        <div className="flex items-center gap-3">
          {/* Toggle de Tema */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn(
              "relative h-10 w-10 rounded-full transition-all duration-300",
              "hover:bg-primary/10 hover:text-primary hover:scale-110",
              "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            )}
            aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            <div className="relative w-5 h-5">
              <Sun
                className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-500 ease-spring",
                  isDark
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                )}
              />
              <Moon
                className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-500 ease-spring",
                  isDark
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                )}
              />
            </div>
          </Button>

          {/* Notificações - apenas quando logado */}
          {isAuthenticated && <NotificationBell />}

          {/* Menu do Usuário ou Botões de Login */}
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex rounded-xl hover:bg-primary/10 hover:text-primary"
              >
                <Link href="/login">Entrar</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg hover:shadow-primary/25 rounded-xl"
              >
                <Link href="/register">Começar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";

import { MobileNav } from "@/components/layout/MobileNav";
import { NotificationBell } from "@/components/navigation/NotificationBell";
import { UserMenu } from "@/components/navigation/UserMenu";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/store";
import { Moon, Sparkles, Sun } from "lucide-react";
import Link from "next/link";

export function Header() {
  const { isAuthenticated } = useAuthStore();
  const { setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-background/70 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Logo e Navegação Mobile */}
        <div className="flex items-center gap-4">
          {isAuthenticated && <MobileNav />}

          <Link
            href={isAuthenticated ? "/dashboard" : "/"}
            className="group flex items-center gap-2 transition-all hover:opacity-90"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="hidden text-lg font-bold tracking-tight sm:inline-block">
              Ultrafit Lab
            </span>
          </Link>

          {/* Navegação Desktop - apenas quando logado */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1 ml-6">
              {[
                { href: "/dashboard", label: "Dashboard" },
                { href: "/workout/plan", label: "Treinos" },
                { href: "/nutrition", label: "Nutrição" },
                { href: "/progress", label: "Progresso" },
              ].map((link) => (
                <Button
                  key={link.href}
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all rounded-lg px-3"
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </nav>
          )}
        </div>

        {/* Ações do Header */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Toggle de Tema */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative h-9 w-9 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Notificações - apenas quando logado */}
          {isAuthenticated && <NotificationBell />}

          {/* Menu do Usuário ou Botões de Login */}
          {isAuthenticated ? (
            <div className="hidden md:block">
              <UserMenu />
            </div>
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
                className="bg-linear-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg hover:shadow-primary/25 rounded-xl text-white font-medium px-6"
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

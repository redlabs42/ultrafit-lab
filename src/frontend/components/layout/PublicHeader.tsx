"use client";

import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/about", label: "Sobre" },
    { href: "/pricing", label: "Planos" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 py-4 shadow-sm"
          : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70 group-hover:text-primary transition-colors duration-300">
            Ultrafit Lab
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-white/5 group overflow-hidden",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="relative z-10">{link.label}</span>
              {pathname === link.href && (
                <span className="absolute inset-0 bg-primary/10 rounded-full z-0" />
              )}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button
            asChild
            variant="ghost"
            className="hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <Link href="/login">Entrar</Link>
          </Button>
          <Button
            asChild
            className="btn-premium rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40"
          >
            <Link href="/register">Começar</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/70 backdrop-blur-2xl border-b border-border/40 p-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-5 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-lg font-medium py-3 px-4 rounded-xl transition-all",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border/50">
            <Button
              asChild
              variant="outline"
              className="w-full justify-center border-primary/20 hover:bg-primary/5 hover:text-primary"
            >
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild className="w-full justify-center btn-premium">
              <Link href="/register">Começar Agora</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

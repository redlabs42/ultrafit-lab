"use client";

import {
  CreditCard,
  Dumbbell,
  LayoutDashboard,
  Settings,
  TrendingUp,
  User,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Nutrição", href: "/nutrition", icon: Utensils },
  { name: "Treino", href: "/workout", icon: Dumbbell },
  { name: "Progresso", href: "/progress", icon: TrendingUp },
  { name: "Assinatura", href: "/subscription", icon: CreditCard },
];

const secondaryNavigation = [
  { name: "Perfil", href: "/profile", icon: User },
  { name: "Configurações", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:z-50 lg:p-4">
      <div className="flex flex-col flex-grow gap-y-5 overflow-y-auto bg-background/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-4">
        <div className="flex h-16 shrink-0 items-center px-2">
          {/* Logo placeholder or specific sidebar header content if needed */}
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent opacity-80" />
          <span className="ml-3 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Menu
          </span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex gap-x-3 rounded-2xl p-3 text-sm leading-6 font-semibold transition-all duration-300 ease-out",
                          isActive
                            ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(59,130,246,0.15)] border border-primary/20"
                            : "text-muted-foreground hover:text-white hover:bg-white/5"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-6 w-6 shrink-0 transition-colors duration-300",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-white"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="mt-auto">
              <div className="rounded-3xl bg-white/5 p-4 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg">
                    U
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate text-foreground">
                      Usuário
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      Premium
                    </p>
                  </div>
                </div>
                <ul className="-mx-2 space-y-1">
                  {secondaryNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-2xl p-2 text-xs leading-6 font-semibold transition-all duration-300 ease-out",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-white hover:bg-white/5"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-4 w-4 shrink-0 transition-colors duration-300",
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground group-hover:text-white"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

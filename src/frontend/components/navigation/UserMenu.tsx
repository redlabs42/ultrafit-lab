"use client";

import {
  Apple,
  CreditCard,
  Dumbbell,
  LayoutDashboard,
  LogOut,
  Settings,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function UserMenu() {
  const { user, logout } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "group relative flex items-center gap-2 rounded-full",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "transition-all duration-300 hover:scale-105",
          )}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300" />

            <Avatar className="relative h-9 w-9 border-2 border-border/50 group-hover:border-primary/50 transition-colors">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-sm font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={cn(
          "w-64 p-2",
          "bg-background/95 backdrop-blur-xl border-border/50",
          "shadow-xl shadow-black/10",
        )}
      >
        <DropdownMenuLabel className="p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1 flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
          >
            <LayoutDashboard className="h-4 w-4 text-primary" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
          >
            <User className="h-4 w-4 text-primary" />
            <span className="font-medium">Perfil</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/workout/plan"
            className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
          >
            <Dumbbell className="h-4 w-4 text-primary" />
            <span className="font-medium">Treinos</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/nutrition"
            className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
          >
            <Apple className="h-4 w-4 text-primary" />
            <span className="font-medium">Nutrição</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/progress"
            className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
          >
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-medium">Progresso</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem asChild>
          <Link
            href="/subscription"
            className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
          >
            <CreditCard className="h-4 w-4 text-primary" />
            <span className="font-medium">Assinatura</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-accent/50"
          >
            <Settings className="h-4 w-4 text-primary" />
            <span className="font-medium">Configurações</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={() => logout()}
          className={cn(
            "cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md",
            "text-destructive hover:bg-destructive/10 hover:text-destructive",
            "transition-colors",
          )}
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

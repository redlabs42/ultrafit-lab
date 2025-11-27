import {
  CreditCard,
  Dumbbell,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  TrendingUp,
  User,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Nutrição", href: "/nutrition", icon: Utensils },
  { name: "Treino", href: "/workout", icon: Dumbbell },
  { name: "Progresso", href: "/progress", icon: TrendingUp },
  { name: "Assinatura", href: "/subscription", icon: CreditCard },
  { name: "Perfil", href: "/profile", icon: User },
  { name: "Configurações", href: "/settings", icon: Settings },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden -ml-2">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] border-r border-white/10 bg-background/80 p-0 backdrop-blur-2xl"
      >
        <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
        <div className="flex h-full flex-col">
          {/* User Profile Section */}
          <div className="relative overflow-hidden border-b border-white/5 bg-linear-to-b from-primary/10 to-transparent p-6 pt-12">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-lg">
                <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold tracking-tight">
                  {user?.name || "Usuário"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.email || "usuario@email.com"}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navigation.map((item, index) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                      "animate-in slide-in-from-left-2 fade-in duration-300",
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    />
                    {item.name}
                    {isActive && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer Actions */}
          <div className="border-t border-white/5 p-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 rounded-xl px-4 py-6 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sair da conta</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

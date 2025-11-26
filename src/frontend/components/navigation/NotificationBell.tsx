"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function NotificationBell() {
    // Mock de notificações - substituir com dados reais
    const notifications = [
        {
            id: 1,
            title: "Novo treino disponível",
            message: "Seu plano de treino foi atualizado",
            time: "5 min atrás",
            unread: true,
        },
        {
            id: 2,
            title: "Meta atingida!",
            message: "Você completou 5 treinos esta semana",
            time: "2 horas atrás",
            unread: true,
        },
        {
            id: 3,
            title: "Lembrete de nutrição",
            message: "Não esqueça de registrar suas refeições",
            time: "1 dia atrás",
            unread: false,
        },
    ];

    const unreadCount = notifications.filter((n) => n.unread).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "relative h-9 w-9 rounded-full transition-all duration-300",
                        "hover:bg-accent/50 hover:scale-110",
                        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    )}
                    aria-label="Notificações"
                >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className={cn(
                    "w-80 p-2",
                    "bg-background/95 backdrop-blur-xl border-border/50",
                    "shadow-xl shadow-black/10"
                )}
            >
                <DropdownMenuLabel className="px-3 py-2">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Notificações</span>
                        {unreadCount > 0 && (
                            <span className="text-xs text-muted-foreground">
                                {unreadCount} nova{unreadCount > 1 ? "s" : ""}
                            </span>
                        )}
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-2" />

                <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={cn(
                                    "cursor-pointer flex flex-col items-start gap-1 px-3 py-3 rounded-md",
                                    "transition-colors hover:bg-accent/50",
                                    notification.unread && "bg-primary/5"
                                )}
                            >
                                <div className="flex items-start justify-between w-full gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {notification.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {notification.message}
                                        </p>
                                    </div>
                                    {notification.unread && (
                                        <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                                    )}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {notification.time}
                                </span>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                            Nenhuma notificação
                        </div>
                    )}
                </div>

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuItem className="cursor-pointer justify-center text-sm font-medium text-primary hover:bg-accent/50">
                    Ver todas as notificações
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

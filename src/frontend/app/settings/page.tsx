"use client";

import { Bell, ChevronRight, CreditCard, Shield, User } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const settingsSections = [
  {
    title: "Conta",
    description: "Gerencie suas informações de conta",
    icon: User,
    href: "/settings/account",
  },
  {
    title: "Notificações",
    description: "Configure suas preferências de notificação",
    icon: Bell,
    href: "/settings/notifications",
  },
  {
    title: "Privacidade e Segurança",
    description: "Controle suas configurações de privacidade",
    icon: Shield,
    href: "/settings/privacy",
  },
  {
    title: "Assinatura",
    description: "Gerencie sua assinatura e pagamentos",
    icon: CreditCard,
    href: "/subscription/manage",
  },
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Configurações
          </h1>
          <p className="text-secondary text-lg">
            Gerencie suas preferências e configurações
          </p>
        </div>

        <div className="grid gap-4">
          {settingsSections.map((section) => (
            <Card
              key={section.href}
              className="hover-lift cursor-pointer transition-all"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <section.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {section.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="icon">
                    <Link href={section.href}>
                      <ChevronRight className="h-6 w-6 text-secondary" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

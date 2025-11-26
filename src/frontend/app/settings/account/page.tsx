"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AccountSettings } from "@/components/settings/AccountSettings";

export default function AccountSettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Configurações da Conta
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas configurações de conta e segurança
          </p>
        </div>

        <AccountSettings />
      </div>
    </DashboardLayout>
  );
}

"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PaymentHistory } from "@/components/payments/PaymentHistory";
import { SubscriptionStatus } from "@/components/payments/SubscriptionStatus";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubscription } from "@/hooks/useSubscription";

export default function ManageSubscriptionPage() {
  const { subscription, isLoading, cancelSubscription, isCancelling } =
    useSubscription();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-64" />
        </div>
      </DashboardLayout>
    );
  }

  if (!subscription) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Gerenciar Assinatura
            </h1>
            <p className="text-muted-foreground">
              Gerencie sua assinatura e histórico de pagamentos
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Nenhuma Assinatura Ativa</CardTitle>
              <CardDescription>
                Você ainda não possui uma assinatura ativa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/subscription">Ver Planos Disponíveis</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gerenciar Assinatura
          </h1>
          <p className="text-muted-foreground">
            Gerencie sua assinatura e histórico de pagamentos
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <SubscriptionStatus
            subscription={subscription}
            onCancel={() => cancelSubscription(subscription.id)}
            isCancelling={isCancelling}
          />

          <Card>
            <CardHeader>
              <CardTitle>Alterar Plano</CardTitle>
              <CardDescription>
                Faça upgrade ou downgrade do seu plano
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/subscription">Ver Outros Planos</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <PaymentHistory />
      </div>
    </DashboardLayout>
  );
}

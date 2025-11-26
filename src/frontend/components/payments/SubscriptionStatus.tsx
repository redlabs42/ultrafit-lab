"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Subscription } from "@/types";

interface SubscriptionStatusProps {
  subscription: Subscription;
  onCancel: () => void;
  isCancelling?: boolean;
}

export function SubscriptionStatus({
  subscription,
  onCancel,
  isCancelling,
}: SubscriptionStatusProps) {
  const getStatusBadge = (status: Subscription["status"]) => {
    const variants: Record<
      Subscription["status"],
      {
        label: string;
        variant: "default" | "secondary" | "destructive" | "outline";
      }
    > = {
      active: { label: "Ativa", variant: "default" },
      trial: { label: "Trial", variant: "secondary" },
      inactive: { label: "Inativa", variant: "outline" },
      cancelled: { label: "Cancelada", variant: "destructive" },
      past_due: { label: "Pagamento Pendente", variant: "destructive" },
    };

    const { label, variant } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Status da Assinatura</CardTitle>
          {getStatusBadge(subscription.status)}
        </div>
        <CardDescription>Gerencie sua assinatura e pagamentos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Período atual:</span>
            <span className="font-medium">
              {formatDate(subscription.currentPeriodStart)} -{" "}
              {formatDate(subscription.currentPeriodEnd)}
            </span>
          </div>

          {subscription.cancelAtPeriodEnd && (
            <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950 p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Sua assinatura será cancelada em{" "}
                {formatDate(subscription.currentPeriodEnd)}
              </p>
            </div>
          )}
        </div>

        {subscription.status === "active" &&
          !subscription.cancelAtPeriodEnd && (
            <Button
              variant="destructive"
              onClick={onCancel}
              disabled={isCancelling}
              className="w-full"
            >
              {isCancelling ? "Cancelando..." : "Cancelar Assinatura"}
            </Button>
          )}
      </CardContent>
    </Card>
  );
}

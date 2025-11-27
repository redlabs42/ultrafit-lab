"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PaymentForm } from "@/components/payments/PaymentForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubscribe, useSubscriptionPlans } from "@/hooks/useSubscription";
import { formatCurrency } from "@/lib/utils";
import { paymentsService } from "@/services/payments";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const [pixData, setPixData] = useState<{
    code: string;
    qrCode: string;
  } | null>(null);

  const { data: plans, isLoading } = useSubscriptionPlans();
  const subscribeMutation = useSubscribe();

  const selectedPlan = plans?.find((p) => p.id === planId);

  const handleCreditCardPayment = async (data: any) => {
    if (!planId) return;

    try {
      // 1. Add payment method
      const paymentMethod = await paymentsService.addPaymentMethod({
        type: "credit_card",
        ...data,
      });

      // 2. Subscribe
      subscribeMutation.mutate(
        { planId, paymentMethodId: paymentMethod.id },
        {
          onSuccess: () => {
            toast.success("Assinatura realizada com sucesso!");
            router.push("/subscription/success");
          },
          onError: () => {
            toast.error(
              "Erro ao processar assinatura. Verifique os dados do cartão.",
            );
          },
        },
      );
    } catch (_error) {
      toast.error("Erro ao adicionar cartão de crédito.");
    }
  };

  const handlePixPayment = async (data: { cpfCnpj: string }) => {
    if (!planId) return;

    try {
      const response = await paymentsService.subscribeWithPix(
        planId,
        data.cpfCnpj,
      );
      if (response.pixCopyPaste && response.pixQrCode) {
        setPixData({
          code: response.pixCopyPaste,
          qrCode: response.pixQrCode,
        });
        toast.success("PIX gerado com sucesso!");
      } else {
        // Fallback or error if no PIX data returned
        toast.error("Erro ao gerar PIX. Tente novamente.");
      }
    } catch (_error) {
      toast.error("Erro ao processar pagamento via PIX.");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto space-y-8 p-6">
          <Skeleton className="h-20 w-1/2" />
          <div className="grid gap-8 md:grid-cols-2">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!selectedPlan) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <Card className="glass-card border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">
                Plano não encontrado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                O plano selecionado não existe ou não está mais disponível.
              </p>
              <button
                type="button"
                onClick={() => router.push("/subscription")}
                className="mt-4 btn-liquid-ghost"
              >
                Voltar para Planos
              </button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Finalizar Assinatura
          </h1>
          <p className="text-muted-foreground">
            Você está a um passo de transformar sua jornada fitness
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Order Summary */}
          <div className="md:col-span-5 space-y-6">
            <Card className="glass-card border-primary/20 shadow-glass overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-surface/50 p-4 rounded-xl border border-border/50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-xl">{selectedPlan.name}</h3>
                      <Badge
                        variant="secondary"
                        className="mt-1 bg-primary/10 text-primary border-primary/20"
                      >
                        {selectedPlan.interval === "monthly"
                          ? "Mensal"
                          : "Anual"}
                      </Badge>
                    </div>
                    <span className="text-2xl font-bold text-foreground">
                      {formatCurrency(selectedPlan.price)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedPlan.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    O que está incluído:
                  </h4>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, i) => (
                      <li
                        // biome-ignore lint/suspicious/noArrayIndexKey: features order is stable
                        key={`${feature}-${i}`}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Total a pagar:
                    </span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {formatCurrency(selectedPlan.price)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4" />
              <span>Pagamento 100% seguro via Asaas</span>
            </div>
          </div>

          {/* Payment Form */}
          <div className="md:col-span-7">
            <PaymentForm
              onSubmitCreditCard={handleCreditCardPayment}
              onSubmitPix={handlePixPayment}
              isLoading={subscribeMutation.isPending}
              pixCode={pixData?.code}
              pixQrCodeUrl={pixData?.qrCode}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout>
          <div className="max-w-4xl mx-auto space-y-6 p-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-96" />
          </div>
        </DashboardLayout>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

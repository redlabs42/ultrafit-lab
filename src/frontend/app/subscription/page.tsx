"use client";

import { Check, Crown, Shield, Star, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSubscriptionPlans } from "@/hooks/useSubscription";
import { cn } from "@/lib/utils";

export default function SubscriptionPage() {
  const router = useRouter();
  const { data: apiPlans, isLoading } = useSubscriptionPlans();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );

  const calculatePrice = (basePrice: number) => {
    if (billingCycle === "monthly") return basePrice;
    // 17% discount for annual
    return basePrice * 0.83;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handlePlanClick = (plan: any) => {
    if (plan.basePrice === 0) {
      // Free plan logic - maybe redirect to register or dashboard
      router.push("/dashboard");
      return;
    }

    if (plan.name === "Enterprise") {
      // Enterprise logic - contact sales
      window.location.href = "mailto:vendas@ultrafitlab.com";
      return;
    }

    if (!apiPlans) {
      toast.error("Erro ao carregar planos. Tente novamente.");
      return;
    }

    const interval = billingCycle === "annual" ? "yearly" : "monthly";
    const apiPlan = apiPlans.find(
      (p) => p.name === plan.name && p.interval === interval,
    );

    if (apiPlan) {
      router.push(`/subscription/checkout?planId=${apiPlan.id}`);
    } else {
      // Fallback if exact match not found, try to find by name only or show error
      // For now, showing error as we need a valid planId for checkout
      toast.error("Plano indisponível para o ciclo selecionado.");
      console.error("Plan not found:", plan.name, interval);
    }
  };

  const plans = [
    {
      name: "Community",
      description: "Acesso à comunidade e dicas básicas.",
      basePrice: 0,
      period: "/mês",
      features: [
        "Acesso à comunidade",
        "Dicas de saúde diárias",
        "Newsletter semanal",
        "Acesso ao blog exclusivo",
      ],
      cta: "Entrar na Comunidade",
      variant: "ghost",
      icon: Users,
    },
    {
      name: "Starter",
      description: "Perfeito para quem está começando sua jornada fitness.",
      basePrice: 19.9,
      period: "/mês",
      features: [
        "Acesso a treinos básicos",
        "Rastreamento de progresso simples",
        "Comunidade de suporte",
        "5 receitas saudáveis por mês",
      ],
      cta: "Começar Agora",
      variant: "ghost",
      icon: Zap,
    },
    {
      name: "Pro",
      description: "A melhor escolha para resultados rápidos e consistentes.",
      basePrice: 29.9,
      period: "/mês",
      features: [
        "Tudo do plano Starter",
        "Treinos personalizados ilimitados",
        "Planos nutricionais completos",
        "Análise avançada de progresso",
        "Suporte prioritário",
      ],
      cta: "Assinar Pro",
      variant: "primary",
      popular: true,
      badge: "Recomendado",
      icon: Star,
    },
    {
      name: "Legend",
      description: "Para quem busca o máximo de performance e exclusividade.",
      basePrice: 49.9,
      period: "/mês",
      features: [
        "Tudo do plano Pro",
        "Mentorias exclusivas mensais",
        "Acesso antecipado a novas features",
        "Merch exclusivo da marca",
        "Grupo VIP no WhatsApp",
      ],
      cta: "Ser uma Lenda",
      variant: "primary",
      popular: true,
      badge: "Melhor Valor",
      icon: Crown,
    },
    {
      name: "Enterprise",
      description: "Para academias e treinadores que buscam excelência.",
      basePrice: 99.9,
      period: "/mês",
      features: [
        "Tudo do plano Legend",
        "Gestão de múltiplos alunos",
        "Marca branca (White-label)",
        "API de integração",
        "Gerente de conta dedicado",
      ],
      cta: "Falar com Vendas",
      variant: "secondary",
      icon: Shield,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Planos e Assinatura
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Desbloqueie todo o seu potencial com nossos planos premium. Cancele
            a qualquer momento.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Label
              htmlFor="billing-toggle"
              className={cn(
                "text-sm font-medium cursor-pointer transition-colors",
                billingCycle === "monthly"
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              Mensal
            </Label>
            <Switch
              id="billing-toggle"
              checked={billingCycle === "annual"}
              onCheckedChange={(checked) =>
                setBillingCycle(checked ? "annual" : "monthly")
              }
            />
            <Label
              htmlFor="billing-toggle"
              className={cn(
                "text-sm font-medium cursor-pointer transition-colors flex items-center gap-2",
                billingCycle === "annual"
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              Anual
              <Badge
                variant="secondary"
                className="bg-success/10 text-success border-success/20 text-xs px-2 py-0.5 h-auto"
              >
                -17% OFF
              </Badge>
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-16">
          {plans.map((plan) => {
            const price = calculatePrice(plan.basePrice);
            const isFree = plan.basePrice === 0;

            return (
              <div
                key={plan.name}
                className={cn(
                  "relative p-6 flex flex-col h-full transition-all duration-300",
                  plan.popular
                    ? "glass-card border-primary/50 shadow-glass-lg scale-105 z-10"
                    : "glass-card hover-lift",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-full text-center">
                    <Badge className="bg-accent hover:bg-accent/90 text-accent-foreground border-none font-bold px-4 py-1 neon-glow-accent text-xs tracking-widest uppercase whitespace-nowrap">
                      {plan.badge || "Mais Popular"}
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
                      plan.variant === "primary"
                        ? "bg-primary/10 text-primary"
                        : "bg-surface text-foreground",
                    )}
                  >
                    <plan.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-xs line-clamp-2 min-h-[2.5em]">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">
                      {isFree ? "Grátis" : formatPrice(price)}
                    </span>
                    {!isFree && (
                      <span className="text-muted-foreground text-sm">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  {!isFree && billingCycle === "annual" && (
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Cobrado anualmente ({formatPrice(price * 12)})
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs"
                    >
                      <div className="mt-0.5 min-w-3 min-h-3 rounded-full bg-success/20 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-success" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handlePlanClick(plan)}
                  disabled={isLoading && !isFree && plan.name !== "Enterprise"}
                  className={cn(
                    "w-full transition-all duration-300 text-sm py-2 rounded-lg",
                    plan.variant === "primary" && "btn-liquid-primary",
                    plan.variant === "secondary" && "btn-liquid-secondary",
                    plan.variant === "ghost" &&
                      "btn-liquid-ghost border border-border",
                    isLoading &&
                      !isFree &&
                      plan.name !== "Enterprise" &&
                      "opacity-50 cursor-not-allowed",
                  )}
                >
                  {isLoading && !isFree && plan.name !== "Enterprise"
                    ? "Carregando..."
                    : plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

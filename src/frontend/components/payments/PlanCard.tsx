"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { SubscriptionPlan } from "@/types";

interface PlanCardProps {
  plan: SubscriptionPlan;
  currentPlanId?: string;
  onSelect: (planId: string) => void;
  isLoading?: boolean;
}

export function PlanCard({
  plan,
  currentPlanId,
  onSelect,
  isLoading,
}: PlanCardProps) {
  const isCurrentPlan = currentPlanId === plan.id;

  return (
    <Card className={plan.popular ? "border-primary shadow-lg" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{plan.name}</CardTitle>
          {plan.popular && <Badge>Mais Popular</Badge>}
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-4xl font-bold">
            {formatCurrency(plan.price)}
          </span>
          <span className="text-muted-foreground">
            /{plan.interval === "monthly" ? "mês" : "ano"}
          </span>
        </div>

        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => onSelect(plan.id)}
          disabled={isCurrentPlan || isLoading}
          variant={plan.popular ? "default" : "outline"}
        >
          {isCurrentPlan ? "Plano Atual" : "Selecionar Plano"}
        </Button>
      </CardFooter>
    </Card>
  );
}

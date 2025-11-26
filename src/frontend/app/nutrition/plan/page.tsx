"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MacrosChart } from "@/components/nutrition/MacrosChart";
import { MealCard } from "@/components/nutrition/MealCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivePlan } from "@/hooks/useNutrition";

export default function NutritionPlanPage() {
  const { data: plan, isLoading } = useActivePlan();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-32" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!plan) {
    return (
      <DashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle>Nenhum Plano Ativo</CardTitle>
            <CardDescription>
              Você ainda não possui um plano nutricional ativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/nutrition/generate">Criar Plano</Link>
            </Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">{plan.name}</h1>
          {plan.description && (
            <p className="text-secondary text-lg">{plan.description}</p>
          )}
        </div>

        <MacrosChart
          macros={plan.dailyMacros}
          description="Suas metas diárias de macronutrientes"
        />

        <div>
          <h2 className="text-3xl font-bold mb-6">Refeições</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {plan.meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MacrosChart } from "@/components/nutrition/MacrosChart";
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

export default function NutritionPage() {
  const { data: activePlan, isLoading } = useActivePlan();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Nutrição</h1>
            <p className="text-secondary text-lg">
              Gerencie seus planos nutricionais e refeições
            </p>
          </div>
          <Button asChild>
            <Link href="/nutrition/generate">
              <Plus className="mr-2 h-4 w-4" />
              Gerar Plano com IA
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        ) : activePlan ? (
          <div className="grid gap-6 md:grid-cols-2">
            <MacrosChart
              macros={activePlan.dailyMacros}
              description="Suas metas diárias de macronutrientes"
            />

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl">Plano Atual</CardTitle>
                <CardDescription className="text-base">
                  {activePlan.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activePlan.description && (
                  <p className="text-sm text-secondary">
                    {activePlan.description}
                  </p>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">Refeições:</span>
                    <span className="font-semibold">
                      {activePlan.meals.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">Status:</span>
                    <span className="font-semibold capitalize">
                      {activePlan.status}
                    </span>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href="/nutrition/plan">Ver Detalhes</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Nenhum Plano Ativo</CardTitle>
              <CardDescription>
                Você ainda não possui um plano nutricional ativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/nutrition/generate">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Primeiro Plano
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-2xl">Refeições de Hoje</CardTitle>
            <CardDescription className="text-base">
              Suas refeições planejadas para hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activePlan && activePlan.meals.length > 0 ? (
              <div className="space-y-3">
                {activePlan.meals.slice(0, 3).map((meal) => (
                  <div
                    key={meal.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface/50 hover:bg-surface transition-colors"
                  >
                    <div>
                      <p className="font-semibold">{meal.name}</p>
                      <p className="text-sm text-secondary mt-1">
                        {meal.macros.calories} kcal
                      </p>
                    </div>
                    {meal.time && (
                      <span className="text-sm text-secondary font-medium">
                        {meal.time}
                      </span>
                    )}
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link href="/nutrition/meals">Ver Todas as Refeições</Link>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-secondary text-center py-8">
                Nenhuma refeição planejada
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

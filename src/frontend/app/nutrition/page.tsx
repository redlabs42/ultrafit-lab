"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DailyProgress } from "@/components/nutrition/DailyProgress";
import { WaterTracker } from "@/components/nutrition/WaterTracker";
import { ShoppingListDialog } from "@/components/nutrition/ShoppingListDialog";
import { CalendarStrip } from "@/components/nutrition/CalendarStrip";
import { MealDetailsDialog } from "@/components/nutrition/MealDetailsDialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivePlan } from "@/hooks/useNutrition";
import type { Macros } from "@/types";

export default function NutritionPage() {
  const { data: activePlan, isLoading } = useActivePlan();
  const [consumedMealIds, setConsumedMealIds] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  // Load consumed meals from local storage history
  useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem("consumed-meals-history") || "{}"
    );
    setConsumedMealIds(history[dateKey] || []);
  }, [dateKey]);

  const toggleMeal = (mealId: string) => {
    const newIds = consumedMealIds.includes(mealId)
      ? consumedMealIds.filter((id) => id !== mealId)
      : [...consumedMealIds, mealId];

    setConsumedMealIds(newIds);

    // Save to history immediately
    const history = JSON.parse(
      localStorage.getItem("consumed-meals-history") || "{}"
    );
    history[dateKey] = newIds;
    localStorage.setItem("consumed-meals-history", JSON.stringify(history));
  };

  // Calculate consumed macros
  const consumedMacros: Macros = activePlan
    ? activePlan.meals
        .filter((meal) => consumedMealIds.includes(meal.id))
        .reduce(
          (acc, meal) => ({
            calories: acc.calories + meal.macros.calories,
            protein: acc.protein + meal.macros.protein,
            carbs: acc.carbs + meal.macros.carbs,
            fat: acc.fat + meal.macros.fat,
          }),
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        )
    : { calories: 0, protein: 0, carbs: 0, fat: 0 };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      );
    }

    if (activePlan) {
      return (
        <div className="space-y-6">
          <CalendarStrip
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            className="mb-4"
          />

          {/* Top Row: Daily Progress & Water Tracker */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover-lift border-primary/10 bg-linear-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle>Resumo do Dia</CardTitle>
                <CardDescription>Acompanhe suas metas diárias</CardDescription>
              </CardHeader>
              <CardContent>
                <DailyProgress
                  consumed={consumedMacros}
                  goal={activePlan.dailyMacros}
                />
              </CardContent>
            </Card>

            <WaterTracker dailyGoal={2500} date={selectedDate} />
          </div>

          {/* Bottom Row: Meals & Plan Info */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl">Refeições</CardTitle>
                <CardDescription className="text-base">
                  Marque as refeições consumidas em{" "}
                  {format(selectedDate, "dd/MM")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activePlan.meals.length > 0 ? (
                  <div className="space-y-3">
                    {activePlan.meals.map((meal) => {
                      const isConsumed = consumedMealIds.includes(meal.id);
                      return (
                        <MealDetailsDialog key={meal.id} meal={meal}>
                          <div
                            className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                              isConsumed
                                ? "bg-primary/5 border-primary/20 opacity-70"
                                : "bg-surface/50 border-border hover:bg-surface hover:border-primary/30 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              {/* biome-ignore lint/a11y/noStaticElementInteractions: Stop propagation */}
                              <div
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                                className="focus:outline-none"
                              >
                                <Checkbox
                                  id={`meal-${meal.id}`}
                                  checked={isConsumed}
                                  onCheckedChange={() => toggleMeal(meal.id)}
                                  className="h-5 w-5"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor={`meal-${meal.id}`}
                                  className={`font-semibold cursor-pointer ${
                                    isConsumed
                                      ? "line-through text-muted-foreground"
                                      : ""
                                  }`}
                                >
                                  {meal.name}
                                </label>
                                <p className="text-sm text-secondary mt-1 group-hover:text-primary/80 transition-colors">
                                  {meal.macros.calories} kcal • P:{" "}
                                  {meal.macros.protein}g • C:{" "}
                                  {meal.macros.carbs}g • G: {meal.macros.fat}g
                                </p>
                              </div>
                            </div>
                            {meal.time && (
                              <span className="text-sm text-secondary font-medium">
                                {meal.time}
                              </span>
                            )}
                          </div>
                        </MealDetailsDialog>
                      );
                    })}
                    <Button asChild variant="outline" className="w-full mt-4">
                      <Link href="/nutrition/plan">Ver Detalhes do Plano</Link>
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-secondary text-center py-8">
                    Nenhuma refeição planejada
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="hover-lift h-fit">
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

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2 text-sm">Metas Totais</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Calorias:</span>
                      <span>{activePlan.dailyMacros.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Proteína:</span>
                      <span>{activePlan.dailyMacros.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Carboidratos:
                      </span>
                      <span>{activePlan.dailyMacros.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gorduras:</span>
                      <span>{activePlan.dailyMacros.fat}g</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
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
    );
  };

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
          <div className="flex items-center gap-2">
            {activePlan && <ShoppingListDialog plan={activePlan} />}
            <Button asChild>
              <Link href="/nutrition/generate">
                <Plus className="mr-2 h-4 w-4" />
                Gerar Plano com IA
              </Link>
            </Button>
          </div>
        </div>

        {renderContent()}
      </div>
    </DashboardLayout>
  );
}

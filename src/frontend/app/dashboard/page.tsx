"use client";

import { AchievementsList } from "@/components/dashboard/AchievementsList";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { NextWorkoutCard } from "@/components/dashboard/NextWorkoutCard";
import { NutritionSummaryCard } from "@/components/dashboard/NutritionSummaryCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useActivePlan } from "@/hooks/useNutrition";
import { Apple, Dumbbell, Flame, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: activePlan } = useActivePlan();
  const [consumedCalories, setConsumedCalories] = useState(0);

  useEffect(() => {
    // Calculate consumed calories from local storage
    const saved = localStorage.getItem("consumed-meals-today");
    const savedDate = localStorage.getItem("consumed-meals-date");
    const today = new Date().toDateString();

    if (activePlan && saved && savedDate === today) {
      const consumedIds: string[] = JSON.parse(saved);
      const total = activePlan.meals
        .filter((meal) => consumedIds.includes(meal.id))
        .reduce((acc, meal) => acc + meal.macros.calories, 0);
      setConsumedCalories(total);
    } else {
      setConsumedCalories(0);
    }
  }, [activePlan]);

  const calorieGoal = activePlan?.dailyMacros.calories || 2000;
  const caloriePercentage = Math.min(
    (consumedCalories / calorieGoal) * 100,
    100
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8 fade-in relative pb-20 sm:pb-0">
        {/* Background decorativo */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-linear-to-br from-primary/10 via-accent/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-linear-to-tr from-accent/10 via-warning/5 to-transparent rounded-full blur-3xl" />
        </div>

        <DashboardHeader />

        {/* Stats Grid Premium */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 relative z-10">
          <StatsCard
            title="Treinos"
            value="0"
            subtitle="Completos"
            icon={Dumbbell}
            trend="0/5"
            trendLabel="Meta"
            color="primary"
            progress={0}
          />
          <StatsCard
            title="Nutrição"
            value={consumedCalories}
            subtitle="kcal hoje"
            icon={Apple}
            trend={`${consumedCalories}/${calorieGoal}`}
            trendLabel="Meta"
            color="accent"
            progress={caloriePercentage}
          />
          <StatsCard
            title="Sequência"
            value="0"
            subtitle="dias seguidos"
            icon={Flame}
            trend="Continue!"
            trendLabel="Status"
            color="warning"
          />
          <StatsCard
            title="Progresso"
            value="0%"
            subtitle="do objetivo"
            icon={TrendingUp}
            trend="0/20"
            trendLabel="Meta mês"
            color="success"
            progress={0}
          />
        </div>

        {/* Main Content Grid Premium */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 relative z-10">
          <NextWorkoutCard />
          <NutritionSummaryCard consumedCalories={consumedCalories} />
        </div>

        {/* Quick Actions & Achievements */}
        <div className="space-y-4 sm:space-y-6 relative z-10">
          <QuickActions />
          <AchievementsList />
        </div>
      </div>
    </DashboardLayout>
  );
}

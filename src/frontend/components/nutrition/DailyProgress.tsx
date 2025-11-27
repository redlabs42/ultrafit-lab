"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Macros } from "@/types";

interface DailyProgressProps {
  consumed: Macros;
  goal: Macros;
}

export function DailyProgress({ consumed, goal }: DailyProgressProps) {
  const getPercentage = (current: number, total: number) => {
    if (total === 0) return 0;
    return Math.min((current / total) * 100, 100);
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle className="text-lg">Progresso Diário</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-5">
        {/* Calories */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Calorias</span>
            <span className="text-muted-foreground">
              {consumed.calories} / {goal.calories} kcal
            </span>
          </div>
          <Progress
            value={getPercentage(consumed.calories, goal.calories)}
            className="h-2.5"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Protein */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-primary">Proteína</span>
              <span className="text-muted-foreground">
                {consumed.protein}/{goal.protein}g
              </span>
            </div>
            <Progress
              value={getPercentage(consumed.protein, goal.protein)}
              className="h-1.5"
              indicatorClassName="bg-primary"
            />
          </div>

          {/* Carbs */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-accent">Carboidratos</span>
              <span className="text-muted-foreground">
                {consumed.carbs}/{goal.carbs}g
              </span>
            </div>
            <Progress
              value={getPercentage(consumed.carbs, goal.carbs)}
              className="h-1.5"
              indicatorClassName="bg-accent"
            />
          </div>

          {/* Fat */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-warning">Gorduras</span>
              <span className="text-muted-foreground">
                {consumed.fat}/{goal.fat}g
              </span>
            </div>
            <Progress
              value={getPercentage(consumed.fat, goal.fat)}
              className="h-1.5"
              indicatorClassName="bg-warning"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

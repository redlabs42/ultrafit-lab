"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Macros } from "@/types";

interface MacrosChartProps {
  macros: Macros;
  title?: string;
  description?: string;
}

export function MacrosChart({
  macros,
  title = "Macros Diários",
  description,
}: MacrosChartProps) {
  const total = macros.protein + macros.carbs + macros.fat;
  const proteinPercent = (macros.protein / total) * 100;
  const carbsPercent = (macros.carbs / total) * 100;
  const fatPercent = (macros.fat / total) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold">{macros.calories}</div>
          <div className="text-sm text-muted-foreground">calorias</div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Proteína</span>
              <span className="font-medium">
                {macros.protein}g ({proteinPercent.toFixed(0)}%)
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${proteinPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Carboidratos</span>
              <span className="font-medium">
                {macros.carbs}g ({carbsPercent.toFixed(0)}%)
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent"
                style={{ width: `${carbsPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Gordura</span>
              <span className="font-medium">
                {macros.fat}g ({fatPercent.toFixed(0)}%)
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-warning"
                style={{ width: `${fatPercent}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

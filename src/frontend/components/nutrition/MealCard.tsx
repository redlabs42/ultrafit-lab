"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Meal } from "@/types";

interface MealCardProps {
  meal: Meal;
}

const mealTypeLabels: Record<Meal["type"], string> = {
  breakfast: "Café da Manhã",
  lunch: "Almoço",
  dinner: "Jantar",
  snack: "Lanche",
};

const mealTypeEmojis: Record<Meal["type"], string> = {
  breakfast: "🌅",
  lunch: "🍽️",
  dinner: "🌙",
  snack: "🍎",
};

export function MealCard({ meal }: MealCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span>{mealTypeEmojis[meal.type]}</span>
            {meal.name}
          </CardTitle>
          <Badge variant="secondary">{mealTypeLabels[meal.type]}</Badge>
        </div>
        {meal.time && (
          <CardDescription>Horário sugerido: {meal.time}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Alimentos:</h4>
          <ul className="space-y-1">
            {meal.foods.map((food) => (
              <li key={food.id} className="text-sm text-muted-foreground">
                • {food.name} - {food.quantity}
                {food.unit}
              </li>
            ))}
          </ul>
        </div>

        {meal.instructions && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Instruções:</h4>
            <p className="text-sm text-muted-foreground">{meal.instructions}</p>
          </div>
        )}

        <div className="grid grid-cols-4 gap-2 pt-2 border-t">
          <div className="text-center">
            <div className="text-lg font-bold">{meal.macros.calories}</div>
            <div className="text-xs text-muted-foreground">kcal</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{meal.macros.protein}g</div>
            <div className="text-xs text-muted-foreground">Proteína</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{meal.macros.carbs}g</div>
            <div className="text-xs text-muted-foreground">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{meal.macros.fat}g</div>
            <div className="text-xs text-muted-foreground">Gordura</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

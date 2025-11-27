"use client";

import { ChefHat, Clock, Flame, Utensils } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Meal } from "@/types";

interface MealDetailsDialogProps {
  meal: Meal;
  children: React.ReactNode;
}

const mealTypeEmojis: Record<Meal["type"], string> = {
  breakfast: "🌅",
  lunch: "🍽️",
  dinner: "🌙",
  snack: "🍎",
};

const mealTypeLabels: Record<Meal["type"], string> = {
  breakfast: "Café da Manhã",
  lunch: "Almoço",
  dinner: "Jantar",
  snack: "Lanche",
};

export function MealDetailsDialog({ meal, children }: MealDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] h-auto flex flex-col p-0 gap-0 overflow-hidden border-none bg-surface/95 backdrop-blur-xl rounded-2xl">
        {/* Header Section with Gradient */}
        <div className="relative p-6 pb-8 bg-linear-to-br from-primary/10 via-primary/5 to-transparent border-b border-border/50">
          <div className="absolute top-4 right-4">
            <Badge
              variant="secondary"
              className="bg-surface/50 backdrop-blur-md border-primary/20"
            >
              {mealTypeLabels[meal.type]}
            </Badge>
          </div>

          <DialogHeader className="text-left space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl shadow-sm filter drop-shadow-md">
                {mealTypeEmojis[meal.type]}
              </span>
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight">
                  {meal.name}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" />
                  {meal.time || "Horário flexível"}
                </DialogDescription>
              </div>
            </div>

            {/* Macro Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="bg-surface/60 backdrop-blur-sm rounded-xl p-3 border border-border/50 text-center shadow-xs">
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
                  Calorias
                </div>
                <div className="text-xl font-bold text-primary">
                  {meal.macros.calories}
                </div>
                <div className="text-[10px] text-muted-foreground">kcal</div>
              </div>
              <div className="bg-surface/60 backdrop-blur-sm rounded-xl p-3 border border-border/50 text-center shadow-xs">
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
                  Proteína
                </div>
                <div className="text-xl font-bold text-blue-500">
                  {meal.macros.protein}g
                </div>
                <div className="text-[10px] text-muted-foreground">prot</div>
              </div>
              <div className="bg-surface/60 backdrop-blur-sm rounded-xl p-3 border border-border/50 text-center shadow-xs">
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
                  Carbs
                </div>
                <div className="text-xl font-bold text-amber-500">
                  {meal.macros.carbs}g
                </div>
                <div className="text-[10px] text-muted-foreground">carbs</div>
              </div>
              <div className="bg-surface/60 backdrop-blur-sm rounded-xl p-3 border border-border/50 text-center shadow-xs">
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
                  Gordura
                </div>
                <div className="text-xl font-bold text-rose-500">
                  {meal.macros.fat}g
                </div>
                <div className="text-[10px] text-muted-foreground">gord</div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-hidden bg-surface">
          <Tabs defaultValue="ingredients" className="h-full flex flex-col">
            <div className="px-6 pt-4 border-b border-border/50">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1">
                <TabsTrigger
                  value="ingredients"
                  className="data-[state=active]:bg-surface data-[state=active]:shadow-sm"
                >
                  <Utensils className="w-4 h-4 mr-2" />
                  Ingredientes
                </TabsTrigger>
                <TabsTrigger
                  value="instructions"
                  className="data-[state=active]:bg-surface data-[state=active]:shadow-sm"
                >
                  <ChefHat className="w-4 h-4 mr-2" />
                  Preparo
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 p-6">
              <TabsContent value="ingredients" className="mt-0 space-y-4 pb-6">
                <div className="space-y-3">
                  {meal.foods.map((food) => (
                    <div
                      key={food.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 bg-surface/50 hover:bg-surface hover:border-primary/20 transition-colors"
                    >
                      <Checkbox id={`food-${food.id}`} />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={`food-${food.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {food.name}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {food.quantity} {food.unit}
                        </p>
                      </div>
                      <div className="ml-auto text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {food.macros.calories} kcal
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="instructions" className="mt-0 pb-6">
                {meal.instructions ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
                      <h4 className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold mb-2 mt-0">
                        <Flame className="w-4 h-4" />
                        Dica do Chef
                      </h4>
                      <p className="text-sm text-muted-foreground m-0">
                        Prepare os ingredientes com antecedência para facilitar
                        o processo. Mantenha-se hidratado enquanto cozinha!
                      </p>
                    </div>

                    <div className="space-y-4">
                      {meal.instructions.split("\n").map(
                        (step, index) =>
                          step.trim() && (
                            // biome-ignore lint/suspicious/noArrayIndexKey: Static list derived from string split
                            <div key={`step-${index}`} className="flex gap-4">
                              <div className="flex-none w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
                                {index + 1}
                              </div>
                              <p className="text-sm leading-relaxed pt-1 text-foreground/90">
                                {step}
                              </p>
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <ChefHat className="w-12 h-12 mb-4 opacity-20" />
                    <p>Nenhuma instrução específica para esta refeição.</p>
                    <p className="text-sm opacity-60">
                      Aproveite sua refeição!
                    </p>
                  </div>
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border/50 bg-muted/30 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Fechar
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
            Concluir Refeição
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

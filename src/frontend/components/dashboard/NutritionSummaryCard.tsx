import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useActivePlan } from "@/hooks/useNutrition";
import { Apple, ChevronRight, Plus, Utensils } from "lucide-react";
import Link from "next/link";

interface NutritionSummaryCardProps {
  consumedCalories: number;
}

export function NutritionSummaryCard({
  consumedCalories,
}: NutritionSummaryCardProps) {
  const { data: activePlan } = useActivePlan();

  return (
    <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-2xl shadow-2xl hover:shadow-accent/10 transition-all duration-500 rounded-2xl sm:rounded-3xl">
      <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-500" />

      <CardHeader className="relative z-10 pb-2 sm:pb-6 p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-linear-to-br from-accent to-success rounded-xl sm:rounded-2xl blur-lg opacity-50" />
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-accent via-accent to-success flex items-center justify-center shadow-2xl">
              <Utensils className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg sm:text-2xl font-bold mb-0.5 sm:mb-1 truncate">
              Plano Nutricional
            </CardTitle>
            <CardDescription className="text-xs sm:text-base truncate">
              Suas refeições de hoje
            </CardDescription>
          </div>
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="relative overflow-hidden rounded-xl sm:rounded-3xl bg-white/5 p-4 sm:p-8 border border-white/10 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />

          <div className="relative text-center space-y-4 sm:space-y-6">
            {activePlan ? (
              <>
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-accent truncate">
                    {activePlan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activePlan.meals.length} refeições planejadas para hoje
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div className="bg-white/5 p-2 sm:p-3 rounded-xl">
                    <span className="block text-muted-foreground text-xs">
                      Meta
                    </span>
                    <span className="font-bold text-sm sm:text-base">
                      {activePlan.dailyMacros.calories} kcal
                    </span>
                  </div>
                  <div className="bg-white/5 p-2 sm:p-3 rounded-xl">
                    <span className="block text-muted-foreground text-xs">
                      Consumido
                    </span>
                    <span className="font-bold text-accent text-sm sm:text-base">
                      {consumedCalories} kcal
                    </span>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-linear-to-r from-accent via-accent to-success hover:opacity-90 shadow-xl shadow-accent/20 transition-all duration-300 hover:scale-[1.02] h-10 sm:h-12 text-sm sm:text-base font-bold rounded-xl"
                  size="lg"
                >
                  <Link href="/nutrition">
                    <Utensils className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Ver Detalhes
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-success/20 rounded-full blur-xl" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-accent/20 to-success/10 flex items-center justify-center mx-auto border border-accent/30">
                    <Apple className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nenhum plano nutricional ativo
                  </p>
                  <p className="text-xs text-accent font-semibold">
                    Crie um plano personalizado com IA!
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full bg-linear-to-r from-accent via-accent to-success hover:opacity-90 shadow-xl shadow-accent/20 transition-all duration-300 hover:scale-[1.02] h-10 sm:h-12 text-sm sm:text-base font-bold rounded-xl"
                  size="lg"
                >
                  <Link href="/nutrition/generate">
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Criar Plano Nutricional
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

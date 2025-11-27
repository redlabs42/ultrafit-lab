import { Calendar, ChevronRight, Plus, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function NextWorkoutCard() {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-2xl shadow-2xl hover:shadow-primary/10 transition-all duration-500 rounded-2xl sm:rounded-3xl">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />

      <CardHeader className="relative z-10 pb-2 sm:pb-6 p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-linear-to-br from-primary to-accent rounded-xl sm:rounded-2xl blur-lg opacity-50" />
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-primary via-primary to-accent flex items-center justify-center shadow-2xl">
              <Calendar className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg sm:text-2xl font-bold mb-0.5 sm:mb-1 truncate">
              Próximo Treino
            </CardTitle>
            <CardDescription className="text-xs sm:text-base truncate">
              Seu treino agendado
            </CardDescription>
          </div>
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="relative overflow-hidden rounded-xl sm:rounded-3xl bg-white/5 p-4 sm:p-8 border border-white/10 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

          <div className="relative text-center space-y-4 sm:space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-full blur-xl" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto border border-primary/30">
                <Target className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nenhum treino agendado ainda
              </p>
              <p className="text-xs text-primary font-semibold">
                Crie seu primeiro plano personalizado!
              </p>
            </div>

            <Button
              className="w-full bg-linear-to-r from-primary via-primary to-accent hover:opacity-90 shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] h-10 sm:h-12 text-sm sm:text-base font-bold rounded-xl"
              size="lg"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Criar Plano de Treino
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

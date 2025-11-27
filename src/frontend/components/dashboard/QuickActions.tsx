import { Apple, ChevronRight, Dumbbell, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function QuickActions() {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-2xl shadow-2xl z-10 rounded-2xl sm:rounded-3xl">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-accent/5 to-success/5 opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <CardHeader className="relative z-10 pb-2 sm:pb-6 p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-primary via-accent to-success rounded-xl sm:rounded-2xl blur-md opacity-50" />
            <div className="relative bg-linear-to-r from-primary via-accent to-success p-1.5 sm:p-2.5 rounded-lg sm:rounded-2xl">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </div>
          <CardTitle className="text-lg sm:text-3xl font-bold bg-linear-to-r from-primary via-accent to-success bg-clip-text text-transparent">
            Ações Rápidas
          </CardTitle>
        </div>
        <CardDescription className="text-xs sm:text-base">
          Comece sua transformação agora
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="grid gap-3 sm:gap-6 md:grid-cols-3">
          {/* Novo Treino */}
          <Link href="/workout/new" className="block">
            <div className="group/btn relative overflow-hidden rounded-xl sm:rounded-3xl bg-white/5 p-4 sm:p-6 border border-white/10 hover:border-primary/40 transition-all duration-500 hover:scale-[1.02] sm:hover:scale-[1.05] hover:shadow-2xl hover:shadow-primary/20 text-left h-full">
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 space-y-3 sm:space-y-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-linear-to-br from-primary to-primary/50 rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity" />
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl">
                    <Dumbbell className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <h3 className="font-bold text-sm sm:text-lg">Novo Treino</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    Gerar plano personalizado com IA
                  </p>
                </div>

                <div className="flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm">
                  <span>Começar agora</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Plano Alimentar */}
          <Link href="/nutrition/generate" className="block">
            <div className="group/btn relative overflow-hidden rounded-xl sm:rounded-3xl bg-white/5 p-4 sm:p-6 border border-white/10 hover:border-accent/40 transition-all duration-500 hover:scale-[1.02] sm:hover:scale-[1.05] hover:shadow-2xl hover:shadow-accent/20 text-left h-full">
              <div className="absolute inset-0 bg-linear-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 space-y-3 sm:space-y-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-linear-to-br from-accent to-accent/50 rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity" />
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-accent to-accent/80 flex items-center justify-center shadow-xl">
                    <Apple className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <h3 className="font-bold text-sm sm:text-lg">
                    Plano Alimentar
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    Nutrição personalizada para seus objetivos
                  </p>
                </div>

                <div className="flex items-center gap-2 text-accent font-semibold text-xs sm:text-sm">
                  <span>Criar plano</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Ver Progresso */}
          <Link href="/progress" className="block">
            <div className="group/btn relative overflow-hidden rounded-xl sm:rounded-3xl bg-white/5 p-4 sm:p-6 border border-white/10 hover:border-success/40 transition-all duration-500 hover:scale-[1.02] sm:hover:scale-[1.05] hover:shadow-2xl hover:shadow-success/20 text-left h-full">
              <div className="absolute inset-0 bg-linear-to-br from-success/20 via-transparent to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-success/20 rounded-full blur-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 space-y-3 sm:space-y-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-linear-to-br from-success to-success/50 rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity" />
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-success to-success/80 flex items-center justify-center shadow-xl">
                    <TrendingUp className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <h3 className="font-bold text-sm sm:text-lg">
                    Ver Progresso
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    Acompanhe sua evolução e conquistas
                  </p>
                </div>

                <div className="flex items-center gap-2 text-success font-semibold text-xs sm:text-sm">
                  <span>Ver estatísticas</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

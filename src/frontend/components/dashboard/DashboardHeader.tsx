import { Badge } from "@/components/ui/badge";
import { Activity, Sparkles, Zap } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="relative mb-6 sm:mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary via-accent to-warning rounded-2xl blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-linear-to-r from-primary via-accent to-warning p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-primary via-accent to-warning bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl">
            Bem-vindo ao Ultrafit Lab! Transforme seu corpo com inteligência
            artificial.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl backdrop-blur-md transition-all duration-300 text-xs sm:text-sm flex-1 md:flex-none justify-center">
            <Activity className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Status: Ativo
          </Badge>
          <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl backdrop-blur-md transition-all duration-300 text-xs sm:text-sm flex-1 md:flex-none justify-center">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Plano Premium
          </Badge>
        </div>
      </div>
    </div>
  );
}

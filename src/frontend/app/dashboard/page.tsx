import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dumbbell,
  Apple,
  Flame,
  TrendingUp,
  Calendar,
  Utensils,
  Plus,
  Target,
  Activity,
  Sparkles,
  Zap,
  Award,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 fade-in relative">
        {/* Background decorativo */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/10 via-warning/5 to-transparent rounded-full blur-3xl" />
        </div>
        {/* Header Premium */}
        <div className="relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-warning rounded-2xl blur-xl opacity-50 animate-pulse" />
                  <div className="relative bg-gradient-to-r from-primary via-accent to-warning p-3 rounded-2xl shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-warning bg-clip-text text-transparent">
                  Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Bem-vindo ao Ultrafit Lab! Transforme seu corpo com inteligência
                artificial.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20 px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300">
                <Activity className="h-4 w-4 mr-2" />
                Status: Ativo
              </Badge>
              <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/20 px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300">
                <Zap className="h-4 w-4 mr-2" />
                Plano Premium
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Grid Premium */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {/* Treinos */}
          <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-[1.02] rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
              <CardTitle className="text-sm font-bold text-foreground/80 uppercase tracking-wider">
                Treinos
              </CardTitle>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/50 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              <div>
                <div className="text-4xl font-black bg-gradient-to-br from-primary via-primary to-primary/70 bg-clip-text text-transparent mb-2">
                  0
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Completos esta semana
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Meta semanal</span>
                  <span className="font-bold text-primary">0/5</span>
                </div>
                <div className="relative h-2 bg-primary/10 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full" />
                  <div className="relative h-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 w-0 transition-all duration-1000 shadow-lg shadow-primary/50 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calorias */}
          <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:scale-[1.02] rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-colors duration-500" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
              <CardTitle className="text-sm font-bold text-foreground/80 uppercase tracking-wider">
                Nutrição
              </CardTitle>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/50 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-xl">
                  <Apple className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              <div>
                <div className="text-4xl font-black bg-gradient-to-br from-accent via-accent to-accent/70 bg-clip-text text-transparent mb-2">
                  0
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  kcal consumidas hoje
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Meta diária</span>
                  <span className="font-bold text-accent">0/2000</span>
                </div>
                <div className="relative h-2 bg-accent/10 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/5 rounded-full" />
                  <div className="relative h-full bg-gradient-to-r from-accent via-accent/90 to-accent/80 w-0 transition-all duration-1000 shadow-lg shadow-accent/50 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sequência */}
          <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-warning/20 transition-all duration-500 hover:scale-[1.02] rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-warning/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-warning/20 rounded-full blur-3xl group-hover:bg-warning/30 transition-colors duration-500" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
              <CardTitle className="text-sm font-bold text-foreground/80 uppercase tracking-wider">
                Sequência
              </CardTitle>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-warning to-warning/50 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center shadow-xl">
                  <Flame className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              <div>
                <div className="text-4xl font-black bg-gradient-to-br from-warning via-warning to-warning/70 bg-clip-text text-transparent mb-2">
                  0
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  dias consecutivos
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-warning/10 rounded-xl border border-warning/20">
                <Flame className="h-4 w-4 text-warning animate-pulse" />
                <span className="text-xs font-bold text-warning">
                  Continue assim! 🔥
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Progresso */}
          <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-success/20 transition-all duration-500 hover:scale-[1.02] rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-success/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-success/20 rounded-full blur-3xl group-hover:bg-success/30 transition-colors duration-500" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
              <CardTitle className="text-sm font-bold text-foreground/80 uppercase tracking-wider">
                Progresso
              </CardTitle>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-success to-success/50 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              <div>
                <div className="text-4xl font-black bg-gradient-to-br from-success via-success to-success/70 bg-clip-text text-transparent mb-2">
                  0%
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  do objetivo mensal
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Meta do mês</span>
                  <span className="font-bold text-success">0/20</span>
                </div>
                <div className="relative h-2 bg-success/10 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-success/20 to-success/5 rounded-full" />
                  <div className="relative h-full bg-gradient-to-r from-success via-success/90 to-success/80 w-0 transition-all duration-1000 shadow-lg shadow-success/50 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid Premium */}
        <div className="grid gap-6 md:grid-cols-2 relative z-10">
          {/* Próximo Treino */}
          <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-2xl shadow-2xl hover:shadow-primary/10 transition-all duration-500 rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />

            <CardHeader className="relative z-10 pb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-lg opacity-50" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-2xl">
                    <Calendar className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold mb-1">
                    Próximo Treino
                  </CardTitle>
                  <CardDescription className="text-base">
                    Seu treino agendado
                  </CardDescription>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6">
              <div className="relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

                <div className="relative text-center space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto border border-primary/30">
                      <Target className="h-10 w-10 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Nenhum treino agendado ainda
                    </p>
                    <p className="text-xs text-primary font-semibold">
                      Crie seu primeiro plano personalizado!
                    </p>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-primary via-primary to-accent hover:opacity-90 shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] h-12 text-base font-bold rounded-xl"
                    size="lg"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Criar Plano de Treino
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plano Nutricional */}
          <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-2xl shadow-2xl hover:shadow-accent/10 transition-all duration-500 rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-500" />

            <CardHeader className="relative z-10 pb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent to-success rounded-2xl blur-lg opacity-50" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-accent via-accent to-success flex items-center justify-center shadow-2xl">
                    <Utensils className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold mb-1">
                    Plano Nutricional
                  </CardTitle>
                  <CardDescription className="text-base">
                    Suas refeições de hoje
                  </CardDescription>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6">
              <div className="relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />

                <div className="relative text-center space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-success/20 rounded-full blur-xl" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-success/10 flex items-center justify-center mx-auto border border-accent/30">
                      <Apple className="h-10 w-10 text-accent" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Nenhum plano nutricional ativo
                    </p>
                    <p className="text-xs text-accent font-semibold">
                      Crie um plano personalizado com IA!
                    </p>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-accent via-accent to-success hover:opacity-90 shadow-xl shadow-accent/20 transition-all duration-300 hover:scale-[1.02] h-12 text-base font-bold rounded-xl"
                    size="lg"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Criar Plano Nutricional
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Premium */}
        <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-2xl shadow-2xl relative z-10 rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 opacity-50" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

          <CardHeader className="relative z-10 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-success rounded-2xl blur-md opacity-50" />
                <div className="relative bg-gradient-to-r from-primary via-accent to-success p-2.5 rounded-2xl">
                  <Zap className="h-5 w-5 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
                Ações Rápidas
              </CardTitle>
            </div>
            <CardDescription className="text-base">
              Comece sua transformação agora com inteligência artificial
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Novo Treino */}
              <button className="group/btn relative overflow-hidden rounded-3xl bg-white/5 p-6 border border-white/10 hover:border-primary/40 transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-primary/20 text-left">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 space-y-4">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/50 rounded-2xl blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity" />
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl">
                      <Dumbbell className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">Novo Treino</h3>
                    <p className="text-sm text-muted-foreground">
                      Gerar plano personalizado com IA
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <span>Começar agora</span>
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

              {/* Plano Alimentar */}
              <button className="group/btn relative overflow-hidden rounded-3xl bg-white/5 p-6 border border-white/10 hover:border-accent/40 transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-accent/20 text-left">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 space-y-4">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/50 rounded-2xl blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity" />
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-xl">
                      <Apple className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">Plano Alimentar</h3>
                    <p className="text-sm text-muted-foreground">
                      Nutrição personalizada para seus objetivos
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                    <span>Criar plano</span>
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

              {/* Ver Progresso */}
              <button className="group/btn relative overflow-hidden rounded-3xl bg-white/5 p-6 border border-white/10 hover:border-success/40 transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-success/20 text-left">
                <div className="absolute inset-0 bg-gradient-to-br from-success/20 via-transparent to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-success/20 rounded-full blur-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 space-y-4">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-success to-success/50 rounded-2xl blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity" />
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-xl">
                      <TrendingUp className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">Ver Progresso</h3>
                    <p className="text-sm text-muted-foreground">
                      Acompanhe sua evolução e conquistas
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-success font-semibold text-sm">
                    <span>Ver estatísticas</span>
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Conquistas Section */}
        <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-2xl shadow-2xl relative z-10 rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-warning/5 via-transparent to-primary/5 opacity-50" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-warning/10 rounded-full blur-3xl" />

          <CardHeader className="relative z-10 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-warning to-primary rounded-2xl blur-md opacity-50 animate-pulse" />
                  <div className="relative bg-gradient-to-r from-warning to-primary p-2.5 rounded-2xl">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Conquistas
                  </CardTitle>
                  <CardDescription>Suas medalhas e troféus</CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 rounded-xl"
              >
                Ver todas
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: Dumbbell,
                  name: "Primeira Série",
                  locked: false,
                  color: "primary",
                },
                {
                  icon: Flame,
                  name: "Sequência 7 dias",
                  locked: true,
                  color: "warning",
                },
                {
                  icon: Target,
                  name: "Meta Atingida",
                  locked: true,
                  color: "success",
                },
                {
                  icon: Award,
                  name: "Mestre Fitness",
                  locked: true,
                  color: "accent",
                },
              ].map((achievement, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl p-4 border transition-all duration-300 ${
                    achievement.locked
                      ? "bg-muted/20 border-border/30 opacity-50"
                      : `bg-gradient-to-br from-${achievement.color}/10 to-transparent border-${achievement.color}/30 hover:scale-105 hover:shadow-lg`
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div
                      className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center ${
                        achievement.locked
                          ? "bg-muted/30"
                          : `bg-gradient-to-br from-${achievement.color}/20 to-${achievement.color}/10`
                      }`}
                    >
                      <achievement.icon
                        className={`h-6 w-6 ${
                          achievement.locked
                            ? "text-muted-foreground"
                            : `text-${achievement.color}`
                        }`}
                      />
                    </div>
                    <p className="text-xs font-semibold">{achievement.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

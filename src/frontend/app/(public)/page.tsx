import {
  Activity,
  CheckCircle2,
  Dumbbell,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen mesh-gradient bg-noise">
      {/* Hero Section */}
      <main className="flex min-h-screen flex-col items-center justify-center pt-24 px-6 pb-6 md:p-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse-slow delay-1000" />

        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl fade-in z-10">
          {/* Badge de destaque */}
          <Badge
            variant="outline"
            className="mb-4 py-2 px-4 bg-surface/50 border-primary/30 text-primary-foreground bg-primary/20 animate-float backdrop-blur-md"
          >
            <Sparkles className="h-3 w-3 mr-2" />A Evolução do Personal Training
          </Badge>

          {/* Título principal */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
            <span className="text-foreground">Treino Inteligente.</span>
            <br />
            <span className="text-premium-gradient">Resultados Reais.</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            A tecnologia mais avançada do mundo para criar planos de treino e
            nutrição
            <span className="text-foreground font-semibold">
              {" "}
              100% personalizados{" "}
            </span>
            para sua biologia e objetivos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <Button asChild size="lg" className="h-14 px-8 text-lg btn-premium">
              <Link href="/register">
                <Zap className="h-5 w-5 mr-2" />
                Começar Agora
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="h-14 px-8 text-lg hover-scale bg-surface/80 backdrop-blur-md border border-white/10"
            >
              <Link href="/login">Já tenho conta</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 flex items-center justify-center gap-8 text-muted-foreground/60 grayscale opacity-70">
            {/* Placeholder for logos or trust badges if needed */}
            <div className="flex items-center gap-2 text-sm font-medium">
              <Shield className="h-4 w-4" /> Dados Criptografados
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4" /> +10k Usuários
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-24 px-6 md:px-12 bg-surface/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Por que o Ultrafit Lab?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combinamos ciência esportiva e algoritmos avançados para entregar
              a experiência de um personal trainer de elite, disponível 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="textured-card bg-noise hover-lift p-8 text-left group border-primary/10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <Activity className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Tecnologia Adaptativa</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Nossos algoritmos analisam seu perfil, histórico e feedback para
                ajustar seus treinos dinamicamente. Se você evolui, seu treino
                evolui junto.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="textured-card bg-noise hover-lift p-8 text-left group border-primary/10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-6 group-hover:bg-accent/20 transition-colors">
                <TrendingUp className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Progresso Mensurável</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Visualize sua evolução com métricas detalhadas. Acompanhe
                cargas, volume, peso corporal e consistência em dashboards
                intuitivos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="textured-card bg-noise hover-lift p-8 text-left group border-primary/10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-success/10 mb-6 group-hover:bg-success/20 transition-colors">
                <Target className="h-7 w-7 text-success" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Nutrição Integrada</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Não adianta treinar sem comer bem. Receba planos alimentares
                flexíveis que se alinham perfeitamente com sua rotina de
                treinos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-24 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto textured-card bg-noise p-12 md:p-16 rounded-3xl border-primary/20 bg-linear-to-br from-surface/80 to-surface/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-border/50">
            <div className="p-4">
              <div className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-b from-primary to-primary/60">
                10k+
              </div>
              <div className="text-lg text-muted-foreground font-medium">
                Usuários Ativos
              </div>
            </div>
            <div className="p-4">
              <div className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-b from-accent to-accent/60">
                500k+
              </div>
              <div className="text-lg text-muted-foreground font-medium">
                Treinos Concluídos
              </div>
            </div>
            <div className="p-4">
              <div className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-b from-success to-success/60">
                98%
              </div>
              <div className="text-lg text-muted-foreground font-medium">
                Objetivos Alcançados
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Comece sua jornada hoje
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Escolha o plano ideal para você e transforme seu corpo com a
            tecnologia mais avançada do mercado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="textured-card bg-noise p-8 rounded-2xl border-border hover:border-primary/50 transition-all text-left relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-6">Grátis</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>1 Plano de Treino Básico</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Rastreamento de Progresso</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Acesso à Comunidade</span>
                </li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link href="/register">Criar Conta Grátis</Link>
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="textured-card bg-noise p-8 rounded-2xl border-primary shadow-glass-lg text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors -z-10" />

              <h3 className="text-2xl font-bold mb-2 text-primary">Pro</h3>
              <div className="text-4xl font-bold mb-6">
                R$ 29,90
                <span className="text-lg text-muted-foreground font-normal">
                  /mês
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Planos de Treino Ilimitados</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Nutrição Personalizada</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Ajustes Automáticos (Smart Engine)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Suporte Prioritário</span>
                </li>
              </ul>
              <Button asChild className="w-full btn-premium">
                <Link href="/register">Começar Teste Grátis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-12 bg-linear-to-t from-black/50 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Seu corpo, sua melhor versão.
          </h2>
          <Button
            size="lg"
            className="h-16 px-10 text-xl btn-premium rounded-full"
          >
            <Link href="/register">
              <Dumbbell className="h-6 w-6 mr-3" />
              Criar Minha Conta
            </Link>
          </Button>
          <p className="mt-6 text-muted-foreground">
            Não é necessário cartão de crédito para começar.
          </p>
        </div>
      </section>
    </div>
  );
}

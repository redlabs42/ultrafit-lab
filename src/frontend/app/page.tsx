import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Brain, TrendingUp, Sparkles, Zap, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen mesh-gradient">
      {/* Hero Section */}
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl fade-in">
          {/* Badge de destaque */}
          <Badge variant="success" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by AI
          </Badge>

          {/* Título principal */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="text-primary">Ultrafit</span>{" "}
            <span className="text-foreground">Lab</span>
          </h1>
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Seu personal trainer com{" "}
            <span className="text-primary font-semibold">inteligência artificial</span>.
            Planos personalizados de treino e nutrição para alcançar seus objetivos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild size="lg" className="hover-scale">
              <Link href="/register">
                <Zap className="h-5 w-5 mr-2" />
                Começar Agora
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="hover-scale">
              <Link href="/login">Entrar</Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full">
            {/* Feature 1 */}
            <div className="glass-card hover-lift p-8 text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-glass bg-primary/10 mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">IA Personalizada</h3>
              <p className="text-muted-foreground leading-relaxed">
                Planos de treino e nutrição criados especialmente para você com
                inteligência artificial avançada
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card hover-lift p-8 text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-glass bg-accent/10 mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Acompanhamento</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitore seu progresso e evolução em tempo real com gráficos e
                insights detalhados
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card hover-lift p-8 text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-glass bg-success/10 mb-4">
                <Target className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-3">Resultados</h3>
              <p className="text-muted-foreground leading-relaxed">
                Alcance seus objetivos com orientação profissional e suporte
                personalizado
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="glass-card p-8 mt-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>10k+</div>
                <div className="text-muted-foreground">Usuários Ativos</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: 'hsl(var(--accent))' }}>50k+</div>
                <div className="text-muted-foreground">Treinos Gerados</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: 'hsl(var(--success))' }}>95%</div>
                <div className="text-muted-foreground">Satisfação</div>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="glass-card p-8 mt-12 w-full text-center">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para transformar seu corpo?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Junte-se a milhares de pessoas que já estão alcançando seus objetivos
              com o Ultrafit Lab
            </p>
            <Button size="lg" className="hover-scale">
              <Link href="/register">
                <Dumbbell className="h-5 w-5 mr-2" />
                Começar Gratuitamente
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

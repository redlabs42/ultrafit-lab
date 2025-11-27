import { Globe, Shield, Users, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sobre Nós - Ultrafit Lab",
  description: "Conheça a missão e a tecnologia por trás do Ultrafit Lab.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen mesh-gradient pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Democratizando a <span className="text-primary">Elite</span> do
            Fitness
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Nossa missão é tornar o acompanhamento profissional de alta
            qualidade acessível a todos, usando tecnologia de ponta para
            personalizar cada detalhe da sua jornada.
          </p>
        </div>

        {/* Story/Mission */}
        <div className="glass-card p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold mb-4">Nossa História</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              O Ultrafit Lab nasceu da frustração com a indústria fitness
              tradicional. Personal trainers são caros, e aplicativos genéricos
              não entregam resultados reais.
            </p>
            <p>
              Acreditamos que cada corpo é único. Por isso, desenvolvemos o{" "}
              <strong>Smart Engine™</strong>, uma tecnologia proprietária que
              analisa milhares de pontos de dados para criar planos de treino e
              nutrição que se adaptam à sua biologia, rotina e objetivos.
            </p>
            <p>
              Não somos apenas um app. Somos seu parceiro de treino, disponível
              24 horas por dia, 7 dias por semana.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="glass-card p-6 hover-lift">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Ciência Primeiro</h3>
            <p className="text-muted-foreground">
              Tudo o que fazemos é baseado em evidências científicas e
              princípios comprovados de fisiologia do exercício.
            </p>
          </div>
          <div className="glass-card p-6 hover-lift">
            <Zap className="h-8 w-8 text-accent mb-4" />
            <h3 className="text-xl font-bold mb-2">Tecnologia Smart</h3>
            <p className="text-muted-foreground">
              Algoritmos avançados que aprendem com você. Quanto mais você usa,
              melhor o sistema entende suas necessidades.
            </p>
          </div>
          <div className="glass-card p-6 hover-lift">
            <Users className="h-8 w-8 text-success mb-4" />
            <h3 className="text-xl font-bold mb-2">Comunidade</h3>
            <p className="text-muted-foreground">
              Junte-se a milhares de pessoas focadas em superação e resultados
              reais.
            </p>
          </div>
          <div className="glass-card p-6 hover-lift">
            <Globe className="h-8 w-8 text-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">Acessibilidade</h3>
            <p className="text-muted-foreground">
              Qualidade de elite por uma fração do custo de um personal trainer
              tradicional.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Faça parte da revolução</h2>
          <Button asChild size="lg" className="hover-scale">
            <Link href="/register">Começar Agora</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Planos e Preços - Ultrafit Lab",
  description: "Escolha o plano ideal para seus objetivos de fitness.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen mesh-gradient pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Invista em <span className="text-primary">Você</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Planos flexíveis e transparentes. Sem contratos de longo prazo,
            cancele quando quiser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="glass-card p-8 flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold">Starter</h3>
              <div className="text-3xl font-bold mt-2">Grátis</div>
              <p className="text-sm text-muted-foreground mt-1">
                Para começar sua jornada
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" /> 1 Plano de Treino
                Básico
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" /> Rastreamento de
                Progresso
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <X className="h-4 w-4" /> Nutrição Personalizada
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <X className="h-4 w-4" /> Ajustes Automáticos
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link href="/register">Começar Grátis</Link>
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="glass-card p-8 flex flex-col border-primary relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-primary">Pro</h3>
              <div className="text-3xl font-bold mt-2">
                R$ 29,90
                <span className="text-sm font-normal text-muted-foreground">
                  /mês
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                A experiência completa
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />{" "}
                <strong>Tudo do Starter</strong>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" /> Planos de Treino
                Ilimitados
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" /> Nutrição
                Personalizada
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" /> Smart Engine™
                (Ajustes Auto)
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" /> Suporte Prioritário
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/register">Assinar Pro</Link>
            </Button>
          </div>

          {/* Elite Plan (Mockup) */}
          <div className="glass-card p-8 flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold">Elite</h3>
              <div className="text-3xl font-bold mt-2">
                R$ 59,90
                <span className="text-sm font-normal text-muted-foreground">
                  /mês
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Para atletas dedicados
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />{" "}
                <strong>Tudo do Pro</strong>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" /> Análise de Vídeo
                (Beta)
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" /> Consultoria Mensal
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link href="/register">Assinar Elite</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

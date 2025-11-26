"use client";

import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GeneratePlanForm } from "@/components/workout/GeneratePlanForm";

export default function GenerateWorkoutPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/workout/plan");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Gerar Plano de Treino
          </h1>
          <p className="text-secondary text-lg">
            Use IA para criar um plano personalizado baseado nos seus objetivos
          </p>
        </div>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-2xl">Informações do Plano</CardTitle>
            <CardDescription className="text-base">
              Preencha as informações abaixo para gerar seu plano de treino
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GeneratePlanForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Dicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-secondary">
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Seja específico no seu objetivo para melhores resultados
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Escolha o nível de experiência adequado para evitar lesões
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Liste todos os equipamentos que você tem acesso
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Comece com menos dias por semana se você é iniciante
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

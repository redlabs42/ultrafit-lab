"use client";

import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GeneratePlanForm } from "@/components/nutrition/GeneratePlanForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GenerateNutritionPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/nutrition/plan");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Gerar Plano Nutricional
          </h1>
          <p className="text-secondary text-lg">
            Use nossa tecnologia Smart para criar um plano personalizado baseado
            nos seus objetivos
          </p>
        </div>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-2xl">Informações do Plano</CardTitle>
            <CardDescription className="text-base">
              Preencha as informações abaixo para gerar seu plano nutricional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GeneratePlanForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

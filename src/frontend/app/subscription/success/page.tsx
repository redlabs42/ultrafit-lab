"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">Assinatura Confirmada!</CardTitle>
            <CardDescription>
              Sua assinatura foi ativada com sucesso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Agora você tem acesso completo a todos os recursos do Ultrafit
              Lab. Comece criando seu primeiro plano de treino ou nutrição!
            </p>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full"
              >
                Ir para Dashboard
              </Button>
              <Button
                onClick={() => router.push("/subscription/manage")}
                variant="outline"
                className="w-full"
              >
                Gerenciar Assinatura
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

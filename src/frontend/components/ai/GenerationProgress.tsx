"use client";

import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface GenerationProgressProps {
  isGenerating: boolean;
  progress?: number;
  stage?: string;
  title?: string;
  description?: string;
}

const stages = [
  "Analisando seus objetivos...",
  "Consultando base de conhecimento...",
  "Gerando recomendações personalizadas...",
  "Otimizando resultados...",
  "Finalizando...",
];

export function GenerationProgress({
  isGenerating,
  progress = 0,
  stage,
  title = "Gerando com IA",
  description = "Aguarde enquanto criamos algo especial para você",
}: GenerationProgressProps) {
  if (!isGenerating) {
    return (
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-600">Concluído!</CardTitle>
          </div>
          <CardDescription>Seu conteúdo foi gerado com sucesso</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">
            {stage ||
              stages[Math.floor((progress / 100) * stages.length)] ||
              stages[0]}
          </span>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="space-y-2">
          {stages.map((s, index) => {
            const stageProgress = (index / stages.length) * 100;
            const isComplete = progress > stageProgress;
            const isCurrent =
              progress >= stageProgress &&
              progress < ((index + 1) / stages.length) * 100;

            return (
              <div
                key={s}
                className={`flex items-center gap-2 text-sm ${
                  isComplete
                    ? "text-green-600"
                    : isCurrent
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                }`}
              >
                {isComplete ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-muted" />
                )}
                <span>{s}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

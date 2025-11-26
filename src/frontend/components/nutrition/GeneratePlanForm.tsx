"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { GenerationProgress } from "@/components/ai/GenerationProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGeneratePlan } from "@/hooks/useNutrition";

const generateSchema = z.object({
  goal: z.enum(["weight_loss", "muscle_gain", "maintenance"]),
  dietaryRestrictions: z.string().optional(),
  preferences: z.string().optional(),
});

type GenerateFormData = z.infer<typeof generateSchema>;

interface GeneratePlanFormProps {
  onSuccess?: () => void;
}

export function GeneratePlanForm({ onSuccess }: GeneratePlanFormProps) {
  const generateMutation = useGeneratePlan();
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GenerateFormData>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      goal: "maintenance",
    },
  });

  const onSubmit = (data: GenerateFormData) => {
    const payload = {
      goal: data.goal,
      dietaryRestrictions: data.dietaryRestrictions
        ? data.dietaryRestrictions.split(",").map((s) => s.trim())
        : undefined,
      preferences: data.preferences
        ? data.preferences.split(",").map((s) => s.trim())
        : undefined,
    };

    // Simulate progress
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    generateMutation.mutate(payload, {
      onSuccess: () => {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          onSuccess?.();
        }, 1000);
      },
      onError: () => {
        clearInterval(interval);
        setProgress(0);
      },
    });
  };

  if (generateMutation.isPending || progress > 0) {
    return (
      <GenerationProgress
        isGenerating={generateMutation.isPending}
        progress={progress}
        title="Gerando Plano Nutricional"
        description="Nossa IA está criando um plano personalizado para você"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="goal">Objetivo</Label>
        <select
          id="goal"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("goal")}
        >
          <option value="weight_loss">Perda de Peso</option>
          <option value="muscle_gain">Ganho de Massa</option>
          <option value="maintenance">Manutenção</option>
        </select>
        {errors.goal && (
          <p className="text-sm text-red-500">{errors.goal.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dietaryRestrictions">
          Restrições Alimentares (separadas por vírgula)
        </Label>
        <Input
          id="dietaryRestrictions"
          placeholder="Ex: lactose, glúten, carne vermelha"
          {...register("dietaryRestrictions")}
        />
        {errors.dietaryRestrictions && (
          <p className="text-sm text-red-500">
            {errors.dietaryRestrictions.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferences">
          Preferências (separadas por vírgula)
        </Label>
        <Input
          id="preferences"
          placeholder="Ex: frango, arroz integral, batata doce"
          {...register("preferences")}
        />
        {errors.preferences && (
          <p className="text-sm text-red-500">{errors.preferences.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        <Sparkles className="mr-2 h-4 w-4" />
        Gerar Plano com IA
      </Button>
    </form>
  );
}

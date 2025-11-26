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
import { useGeneratePlan } from "@/hooks/useWorkout";

const generateSchema = z.object({
  goal: z.string().min(3, "Objetivo é obrigatório"),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  daysPerWeek: z.number().min(1).max(7),
  equipment: z.string().optional(),
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
      experience: "beginner",
      daysPerWeek: 3,
    },
  });

  const onSubmit = (data: GenerateFormData) => {
    const payload = {
      goal: data.goal,
      experience: data.experience,
      daysPerWeek: data.daysPerWeek,
      equipment: data.equipment
        ? data.equipment.split(",").map((s) => s.trim())
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
        title="Gerando Plano de Treino"
        description="Nossa IA está criando um plano personalizado para você"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="goal">Objetivo</Label>
        <Input
          id="goal"
          placeholder="Ex: Ganhar massa muscular, perder peso, melhorar condicionamento"
          {...register("goal")}
        />
        {errors.goal && (
          <p className="text-sm text-red-500">{errors.goal.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Nível de Experiência</Label>
        <select
          id="experience"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("experience")}
        >
          <option value="beginner">Iniciante</option>
          <option value="intermediate">Intermediário</option>
          <option value="advanced">Avançado</option>
        </select>
        {errors.experience && (
          <p className="text-sm text-red-500">{errors.experience.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="daysPerWeek">Dias por Semana</Label>
        <Input
          id="daysPerWeek"
          type="number"
          min="1"
          max="7"
          {...register("daysPerWeek", { valueAsNumber: true })}
        />
        {errors.daysPerWeek && (
          <p className="text-sm text-red-500">{errors.daysPerWeek.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="equipment">
          Equipamentos Disponíveis (separados por vírgula)
        </Label>
        <Input
          id="equipment"
          placeholder="Ex: halteres, barra, banco, elásticos"
          {...register("equipment")}
        />
        {errors.equipment && (
          <p className="text-sm text-red-500">{errors.equipment.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        <Sparkles className="mr-2 h-4 w-4" />
        Gerar Plano com IA
      </Button>
    </form>
  );
}

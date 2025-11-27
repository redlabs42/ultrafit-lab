"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInYears } from "date-fns";
import { AlertCircle, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { GenerationProgress } from "@/components/ai/GenerationProgress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGeneratePlan } from "@/hooks/useNutrition";
import { useAuthStore } from "@/store";

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
  const { user } = useAuthStore();
  const generateMutation = useGeneratePlan();
  const [progress, setProgress] = useState(0);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    // Check if user has necessary profile data
    // We check for height, weight, gender, and birthDate (to calc age)
    const hasHeight = !!user?.height;
    const hasWeight = !!user?.weight;
    const hasGender = !!user?.gender;
    const hasBirthDate = !!user?.birthDate;
    const hasActivityLevel = !!user?.activityLevel;

    setIsProfileComplete(
      hasHeight && hasWeight && hasGender && hasBirthDate && hasActivityLevel,
    );
  }, [user]);

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
    if (!user) return;

    // Calculate age if birthDate is present
    let age: number | undefined;
    if (user.birthDate) {
      age = differenceInYears(new Date(), new Date(user.birthDate));
    }

    const payload = {
      goal: data.goal,
      dietaryRestrictions: data.dietaryRestrictions
        ? data.dietaryRestrictions.split(",").map((s) => s.trim())
        : undefined,
      preferences: data.preferences
        ? data.preferences.split(",").map((s) => s.trim())
        : undefined,
      // Pass profile data
      age,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      activityLevel: user.activityLevel,
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
        description="Nosso sistema está criando um plano personalizado para você"
      />
    );
  }

  if (!isProfileComplete) {
    return (
      <div className="space-y-6 py-4">
        <Alert
          variant="destructive"
          className="bg-red-500/10 border-red-500/20 text-red-500"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Perfil Incompleto</AlertTitle>
          <AlertDescription>
            Para gerar um plano nutricional preciso, precisamos que você
            complete seu perfil com seus dados físicos (altura, peso, idade,
            etc).
          </AlertDescription>
        </Alert>

        <div className="flex flex-col items-center justify-center space-y-4 p-8 border-2 border-dashed border-border rounded-xl bg-surface/30">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-lg">Complete seu Perfil</h3>
            <p className="text-sm text-secondary max-w-xs">
              Adicione suas medidas e nível de atividade para que a IA possa
              calcular suas necessidades calóricas.
            </p>
          </div>
          <Button asChild>
            <Link href="/profile">Ir para Perfil</Link>
          </Button>
        </div>
      </div>
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
        Gerar Plano Smart
      </Button>
    </form>
  );
}

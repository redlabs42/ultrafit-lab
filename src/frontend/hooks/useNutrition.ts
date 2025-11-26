"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { nutritionService } from "@/services/nutrition";
import type { Meal, NutritionGoal, NutritionPlan } from "@/types";

export function useNutritionPlans() {
  return useQuery({
    queryKey: ["nutrition-plans"],
    queryFn: () => nutritionService.getPlans(),
  });
}

export function useNutritionPlan(planId: string) {
  return useQuery({
    queryKey: ["nutrition-plan", planId],
    queryFn: () => nutritionService.getPlan(planId),
    enabled: !!planId,
  });
}

export function useActivePlan() {
  return useQuery({
    queryKey: ["active-nutrition-plan"],
    queryFn: () => nutritionService.getActivePlan(),
  });
}

export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      description?: string;
      dailyMacros: NutritionGoal;
      meals: Meal[];
    }) => nutritionService.createPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nutrition-plans"] });
      toast.success("Plano nutricional criado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao criar plano nutricional");
    },
  });
}

export function useGeneratePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      goal: "weight_loss" | "muscle_gain" | "maintenance";
      dietaryRestrictions?: string[];
      preferences?: string[];
    }) => nutritionService.generatePlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nutrition-plans"] });
      queryClient.invalidateQueries({ queryKey: ["active-nutrition-plan"] });
      toast.success("Plano nutricional gerado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao gerar plano nutricional");
    },
  });
}

export function useUpdatePlan(planId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<NutritionPlan>) =>
      nutritionService.updatePlan(planId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nutrition-plan", planId] });
      queryClient.invalidateQueries({ queryKey: ["nutrition-plans"] });
      toast.success("Plano atualizado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao atualizar plano");
    },
  });
}

export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (planId: string) => nutritionService.deletePlan(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nutrition-plans"] });
      toast.success("Plano excluído com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao excluir plano");
    },
  });
}

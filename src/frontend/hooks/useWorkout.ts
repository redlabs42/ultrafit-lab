"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { workoutService } from "@/services/workout";
import type { Workout, WorkoutLog, WorkoutPlan } from "@/types";

export function useWorkoutPlans() {
  return useQuery({
    queryKey: ["workout-plans"],
    queryFn: () => workoutService.getPlans(),
  });
}

export function useWorkoutPlan(planId: string) {
  return useQuery({
    queryKey: ["workout-plan", planId],
    queryFn: () => workoutService.getPlan(planId),
    enabled: !!planId,
  });
}

export function useActivePlan() {
  return useQuery({
    queryKey: ["active-workout-plan"],
    queryFn: () => workoutService.getActivePlan(),
  });
}

export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      description?: string;
      workouts: Workout[];
      schedule: { dayOfWeek: number; workoutId: string }[];
    }) => workoutService.createPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-plans"] });
      toast.success("Plano de treino criado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao criar plano de treino");
    },
  });
}

export function useGeneratePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      goal: string;
      experience: "beginner" | "intermediate" | "advanced";
      daysPerWeek: number;
      equipment?: string[];
    }) => workoutService.generatePlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-plans"] });
      queryClient.invalidateQueries({ queryKey: ["active-workout-plan"] });
      toast.success("Plano de treino gerado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao gerar plano de treino");
    },
  });
}

export function useUpdatePlan(planId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<WorkoutPlan>) =>
      workoutService.updatePlan(planId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-plan", planId] });
      queryClient.invalidateQueries({ queryKey: ["workout-plans"] });
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
    mutationFn: (planId: string) => workoutService.deletePlan(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-plans"] });
      toast.success("Plano excluído com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao excluir plano");
    },
  });
}

export function useExercises() {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: () => workoutService.getExercises(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useWorkoutLogs() {
  return useQuery({
    queryKey: ["workout-logs"],
    queryFn: () => workoutService.getLogs(),
  });
}

export function useLogWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<WorkoutLog, "id" | "userId">) =>
      workoutService.logWorkout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-logs"] });
      toast.success("Treino registrado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao registrar treino");
    },
  });
}

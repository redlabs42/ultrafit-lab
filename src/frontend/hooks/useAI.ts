"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  ChatRequest,
  GenerateNutritionRequest,
  GenerateWorkoutRequest,
} from "@/services/ai";
import { aiService } from "@/services/ai";

export function useGenerateNutritionWithAI() {
  return useMutation({
    mutationFn: (data: GenerateNutritionRequest) =>
      aiService.generateNutritionPlan(data),
    onSuccess: () => {
      toast.success("Plano nutricional gerado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao gerar plano nutricional");
    },
  });
}

export function useGenerateWorkoutWithAI() {
  return useMutation({
    mutationFn: (data: GenerateWorkoutRequest) =>
      aiService.generateWorkoutPlan(data),
    onSuccess: () => {
      toast.success("Plano de treino gerado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao gerar plano de treino");
    },
  });
}

export function useAIChat() {
  return useMutation({
    mutationFn: (data: ChatRequest) => aiService.chat(data),
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao processar mensagem");
    },
  });
}

import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { NutritionPlan, WorkoutPlan } from "@/types";

export interface GenerateNutritionRequest {
  goal: "weight_loss" | "muscle_gain" | "maintenance";
  dietaryRestrictions?: string[];
  preferences?: string[];
  targetCalories?: number;
  mealsPerDay?: number;
}

export interface GenerateWorkoutRequest {
  goal: string;
  experience: "beginner" | "intermediate" | "advanced";
  daysPerWeek: number;
  equipment?: string[];
  focusAreas?: string[];
  duration?: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  context?: "nutrition" | "workout" | "general";
}

export interface ChatResponse {
  message: string;
  suggestions?: string[];
}

export const aiService = {
  // Generate nutrition plan with AI
  async generateNutritionPlan(
    data: GenerateNutritionRequest,
  ): Promise<NutritionPlan> {
    const response = await apiClient.post<NutritionPlan>(
      ENDPOINTS.AI.GENERATE_NUTRITION,
      data,
    );
    return response.data;
  },

  // Generate workout plan with AI
  async generateWorkoutPlan(
    data: GenerateWorkoutRequest,
  ): Promise<WorkoutPlan> {
    const response = await apiClient.post<WorkoutPlan>(
      ENDPOINTS.AI.GENERATE_WORKOUT,
      data,
    );
    return response.data;
  },

  // Chat with AI assistant
  async chat(data: ChatRequest): Promise<ChatResponse> {
    const response = await apiClient.post<ChatResponse>(
      ENDPOINTS.AI.CHAT,
      data,
    );
    return response.data;
  },
};

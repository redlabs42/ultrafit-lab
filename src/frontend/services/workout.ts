import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Exercise, Workout, WorkoutLog, WorkoutPlan } from "@/types";

export const workoutService = {
  // Get all workout plans
  async getPlans(): Promise<WorkoutPlan[]> {
    const response = await apiClient.get<WorkoutPlan[]>(
      ENDPOINTS.WORKOUTS.PLANS,
    );
    return response.data;
  },

  // Get specific plan
  async getPlan(planId: string): Promise<WorkoutPlan> {
    const response = await apiClient.get<WorkoutPlan>(
      ENDPOINTS.WORKOUTS.PLAN(planId),
    );
    return response.data;
  },

  // Get active plan
  async getActivePlan(): Promise<WorkoutPlan | null> {
    try {
      const response = await apiClient.get<WorkoutPlan>(
        ENDPOINTS.WORKOUTS.ACTIVE,
      );
      return response.data;
    } catch (_error) {
      return null;
    }
  },

  // Create workout plan
  async createPlan(data: {
    name: string;
    description?: string;
    workouts: Workout[];
    schedule: { dayOfWeek: number; workoutId: string }[];
  }): Promise<WorkoutPlan> {
    const response = await apiClient.post<WorkoutPlan>(
      ENDPOINTS.WORKOUTS.PLANS,
      data,
    );
    return response.data;
  },

  // Generate plan with AI
  async generatePlan(data: {
    goal: string;
    experience: "beginner" | "intermediate" | "advanced";
    daysPerWeek: number;
    equipment?: string[];
  }): Promise<WorkoutPlan> {
    const response = await apiClient.post<WorkoutPlan>(
      ENDPOINTS.WORKOUTS.GENERATE,
      data,
    );
    return response.data;
  },

  // Update plan
  async updatePlan(
    planId: string,
    data: Partial<WorkoutPlan>,
  ): Promise<WorkoutPlan> {
    const response = await apiClient.patch<WorkoutPlan>(
      ENDPOINTS.WORKOUTS.PLAN(planId),
      data,
    );
    return response.data;
  },

  // Delete plan
  async deletePlan(planId: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.WORKOUTS.PLAN(planId));
  },

  // Get exercises
  async getExercises(): Promise<Exercise[]> {
    const response = await apiClient.get<Exercise[]>(
      ENDPOINTS.WORKOUTS.EXERCISES,
    );
    return response.data;
  },

  // Get workout logs
  async getLogs(): Promise<WorkoutLog[]> {
    const response = await apiClient.get<WorkoutLog[]>(ENDPOINTS.WORKOUTS.LOGS);
    return response.data;
  },

  // Log workout
  async logWorkout(
    data: Omit<WorkoutLog, "id" | "userId">,
  ): Promise<WorkoutLog> {
    const response = await apiClient.post<WorkoutLog>(
      ENDPOINTS.WORKOUTS.LOGS,
      data,
    );
    return response.data;
  },
};

import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Meal, NutritionGoal, NutritionPlan } from "@/types";

export const nutritionService = {
	// Get all nutrition plans
	async getPlans(): Promise<NutritionPlan[]> {
		const response = await apiClient.get<NutritionPlan[]>(
			ENDPOINTS.NUTRITION.PLANS,
		);
		return response.data;
	},

	// Get specific plan
	async getPlan(planId: string): Promise<NutritionPlan> {
		const response = await apiClient.get<NutritionPlan>(
			ENDPOINTS.NUTRITION.PLAN(planId),
		);
		return response.data;
	},

	// Get active plan
	async getActivePlan(): Promise<NutritionPlan | null> {
		try {
			const response = await fetch("/api/nutrition/active");

			if (!response.ok) {
				return null;
			}

			return response.json();
		} catch (_error) {
			return null;
		}
	},

	// Create nutrition plan
	async createPlan(data: {
		name: string;
		description?: string;
		dailyMacros: NutritionGoal;
		meals: Meal[];
	}): Promise<NutritionPlan> {
		const response = await apiClient.post<NutritionPlan>(
			ENDPOINTS.NUTRITION.PLANS,
			data,
		);
		return response.data;
	},

	// Generate plan with AI
	async generatePlan(data: {
		goal: "weight_loss" | "muscle_gain" | "maintenance";
		dietaryRestrictions?: string[];
		preferences?: string[];
	}): Promise<NutritionPlan> {
		const response = await fetch("/api/nutrition/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const error = await response
				.json()
				.catch(() => ({ error: "Erro desconhecido" }));
			throw new Error(error.error || "Erro ao gerar plano nutricional");
		}

		return response.json();
	},

	// Update plan
	async updatePlan(
		planId: string,
		data: Partial<NutritionPlan>,
	): Promise<NutritionPlan> {
		const response = await apiClient.patch<NutritionPlan>(
			ENDPOINTS.NUTRITION.PLAN(planId),
			data,
		);
		return response.data;
	},

	// Delete plan
	async deletePlan(planId: string): Promise<void> {
		await apiClient.delete(ENDPOINTS.NUTRITION.PLAN(planId));
	},

	// Get meals
	async getMeals(): Promise<Meal[]> {
		const response = await apiClient.get<Meal[]>(ENDPOINTS.NUTRITION.MEALS);
		return response.data;
	},
};

import type { NutritionPlan } from "@/types";

// CORS headers for API responses
const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

// Handle CORS preflight requests
export async function OPTIONS() {
	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}

export async function GET() {
	// Mock data for development
	// TODO: Replace with actual database query when backend is ready

	const mockActivePlan: NutritionPlan = {
		id: "demo-plan-1",
		userId: "demo-user",
		name: "Plano Demo - Ganho de Massa",
		description:
			"Plano nutricional de demonstração focado em ganho de massa muscular",
		dailyMacros: {
			calories: 2800,
			protein: 180,
			carbs: 350,
			fats: 80,
		},
		meals: [
			{
				id: "meal-demo-1",
				name: "Café da Manhã",
				time: "07:00",
				foods: [
					"Ovos mexidos (3 unidades)",
					"Pão integral (3 fatias)",
					"Banana",
					"Café com leite",
				],
				macros: {
					calories: 520,
					protein: 28,
					carbs: 62,
					fats: 15,
				},
			},
			{
				id: "meal-demo-2",
				name: "Lanche da Manhã",
				time: "10:00",
				foods: [
					"Whey protein (1 scoop)",
					"Aveia (50g)",
					"Pasta de amendoim (20g)",
				],
				macros: {
					calories: 380,
					protein: 32,
					carbs: 42,
					fats: 10,
				},
			},
			{
				id: "meal-demo-3",
				name: "Almoço",
				time: "12:30",
				foods: [
					"Frango grelhado (200g)",
					"Arroz integral (150g)",
					"Feijão (100g)",
					"Brócolis",
					"Salada",
				],
				macros: {
					calories: 720,
					protein: 58,
					carbs: 95,
					fats: 12,
				},
			},
			{
				id: "meal-demo-4",
				name: "Lanche da Tarde",
				time: "16:00",
				foods: ["Iogurte grego (200g)", "Granola (30g)", "Mel (1 colher)"],
				macros: {
					calories: 340,
					protein: 22,
					carbs: 48,
					fats: 8,
				},
			},
			{
				id: "meal-demo-5",
				name: "Jantar",
				time: "19:30",
				foods: [
					"Carne vermelha magra (180g)",
					"Batata doce (200g)",
					"Legumes grelhados",
				],
				macros: {
					calories: 580,
					protein: 48,
					carbs: 68,
					fats: 14,
				},
			},
			{
				id: "meal-demo-6",
				name: "Ceia",
				time: "22:00",
				foods: ["Queijo cottage (150g)", "Castanhas (20g)"],
				macros: {
					calories: 260,
					protein: 24,
					carbs: 8,
					fats: 16,
				},
			},
		],
		status: "active",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	// Return null if you want to simulate "no active plan"
	// return Response.json(null);

	return new Response(JSON.stringify(mockActivePlan), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			...corsHeaders,
		},
	});
}

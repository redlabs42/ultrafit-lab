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
		startDate: new Date().toISOString(),
		dailyMacros: {
			calories: 2800,
			protein: 180,
			carbs: 350,
			fat: 80,
		},
		meals: [
			{
				id: "meal-demo-1",
				name: "Café da Manhã",
				type: "breakfast",
				time: "07:00",
				foods: [
					{
						id: "food1",
						name: "Ovos mexidos (3 unidades)",
						quantity: 3,
						unit: "units",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food2",
						name: "Pão integral (3 fatias)",
						quantity: 3,
						unit: "slices",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food3",
						name: "Banana",
						quantity: 1,
						unit: "piece",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food4",
						name: "Café com leite",
						quantity: 1,
						unit: "cup",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
				],
				macros: {
					calories: 520,
					protein: 28,
					carbs: 62,
					fat: 15,
				},
			},
			{
				id: "meal-demo-2",
				name: "Lanche da Manhã",
				type: "snack",
				time: "10:00",
				foods: [
					{
						id: "food5",
						name: "Whey protein (1 scoop)",
						quantity: 1,
						unit: "scoop",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food6",
						name: "Aveia (50g)",
						quantity: 50,
						unit: "g",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food7",
						name: "Pasta de amendoim (20g)",
						quantity: 20,
						unit: "g",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
				],
				macros: {
					calories: 380,
					protein: 32,
					carbs: 42,
					fat: 10,
				},
			},
			{
				id: "meal-demo-3",
				name: "Almoço",
				type: "lunch",
				time: "12:30",
				foods: [
					{
						id: "food8",
						name: "Frango grelhado (200g)",
						quantity: 200,
						unit: "g",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food9",
						name: "Arroz integral (150g)",
						quantity: 150,
						unit: "g",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food10",
						name: "Feijão (100g)",
						quantity: 100,
						unit: "g",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food11",
						name: "Brócolis",
						quantity: 1,
						unit: "portion",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food12",
						name: "Salada",
						quantity: 1,
						unit: "portion",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
				],
				macros: {
					calories: 720,
					protein: 58,
					carbs: 95,
					fat: 12,
				},
			},
			{
				id: "meal-demo-4",
				name: "Lanche da Tarde",
				type: "snack",
				time: "16:00",
				foods: [
					{
						id: "food13",
						name: "Iogurte grego (200g)",
						quantity: 200,
						unit: "g",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food14",
						name: "Granola (30g)",
						quantity: 30,
						unit: "g",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food15",
						name: "Mel (1 colher)",
						quantity: 1,
						unit: "tbsp",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
				],
				macros: {
					calories: 340,
					protein: 22,
					carbs: 48,
					fat: 8,
				},
			},
			{
				id: "meal-demo-5",
				name: "Jantar",
				type: "dinner",
				time: "19:30",
				foods: [
					{
						id: "food16",
						name: "Carne vermelha magra (180g)",
						quantity: 180,
						unit: "g",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food17",
						name: "Batata doce (200g)",
						quantity: 200,
						unit: "g",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food18",
						name: "Legumes grelhados",
						quantity: 1,
						unit: "portion",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
				],
				macros: {
					calories: 580,
					protein: 48,
					carbs: 68,
					fat: 14,
				},
			},
			{
				id: "meal-demo-6",
				name: "Ceia",
				type: "snack",
				time: "22:00",
				foods: [
					{
						id: "food19",
						name: "Queijo cottage (150g)",
						quantity: 150,
						unit: "g",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
					{
						id: "food20",
						name: "Castanhas (20g)",
						quantity: 20,
						unit: "g",
						macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
					},
				],
				macros: {
					calories: 260,
					protein: 24,
					carbs: 8,
					fat: 16,
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

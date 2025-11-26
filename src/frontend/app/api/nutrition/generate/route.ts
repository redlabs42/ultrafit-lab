import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { z } from "zod";

// Vercel Free Tier limit: 10 seconds
// Pro Tier allows up to 60 seconds
export const maxDuration = 10;

// Input validation schema
const generatePlanSchema = z.object({
	goal: z.enum(["weight_loss", "muscle_gain", "maintenance"]),
	dietaryRestrictions: z.array(z.string()).optional(),
	preferences: z.array(z.string()).optional(),
});

// Response schema for nutrition plan
const nutritionPlanSchema = z.object({
	name: z.string(),
	description: z.string(),
	dailyMacros: z.object({
		calories: z.number(),
		protein: z.number(),
		carbs: z.number(),
		fats: z.number(),
	}),
	meals: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			time: z.string(),
			foods: z.array(z.string()),
			macros: z.object({
				calories: z.number(),
				protein: z.number(),
				carbs: z.number(),
				fats: z.number(),
			}),
		}),
	),
	status: z.literal("active"),
});

// CORS headers for API responses
const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

// Handle CORS preflight requests
export async function OPTIONS() {
	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { goal, dietaryRestrictions, preferences } =
			generatePlanSchema.parse(body);

		// Build context for the prompt
		const goalDescriptions = {
			weight_loss: "perda de peso (déficit calórico)",
			muscle_gain: "ganho de massa muscular (superávit calórico)",
			maintenance: "manutenção de peso (manutenção calórica)",
		};

		const restrictionsText = dietaryRestrictions?.length
			? `Restrições alimentares: ${dietaryRestrictions.join(", ")}`
			: "Sem restrições alimentares";

		const preferencesText = preferences?.length
			? `Preferências: ${preferences.join(", ")}`
			: "Sem preferências específicas";

		const prompt = `Você é um nutricionista especializado. Crie um plano nutricional completo e detalhado.

Objetivo: ${goalDescriptions[goal]}
${restrictionsText}
${preferencesText}

Crie um plano nutricional no formato JSON com a seguinte estrutura EXATA:
{
  "name": "Nome do plano (ex: Plano para Ganho de Massa)",
  "description": "Descrição breve do plano (2-3 linhas)",
  "dailyMacros": {
    "calories": número_total_calorias,
    "protein": gramas_proteína,
    "carbs": gramas_carboidratos,
    "fats": gramas_gorduras
  },
  "meals": [
    {
      "id": "meal-1",
      "name": "Café da Manhã",
      "time": "07:00",
      "foods": ["Alimento 1", "Alimento 2", "Alimento 3"],
      "macros": {
        "calories": número,
        "protein": número,
        "carbs": número,
        "fats": número
      }
    },
    {
      "id": "meal-2",
      "name": "Lanche da Manhã",
      "time": "10:00",
      "foods": ["Alimento 1", "Alimento 2"],
      "macros": {
        "calories": número,
        "protein": número,
        "carbs": número,
        "fats": número
      }
    },
    {
      "id": "meal-3",
      "name": "Almoço",
      "time": "12:30",
      "foods": ["Alimento 1", "Alimento 2", "Alimento 3", "Alimento 4"],
      "macros": {
        "calories": número,
        "protein": número,
        "carbs": número,
        "fats": número
      }
    },
    {
      "id": "meal-4",
      "name": "Lanche da Tarde",
      "time": "16:00",
      "foods": ["Alimento 1", "Alimento 2"],
      "macros": {
        "calories": número,
        "protein": número,
        "carbs": número,
        "fats": número
      }
    },
    {
      "id": "meal-5",
      "name": "Jantar",
      "time": "19:30",
      "foods": ["Alimento 1", "Alimento 2", "Alimento 3"],
      "macros": {
        "calories": número,
        "protein": número,
        "carbs": número,
        "fats": número
      }
    },
    {
      "id": "meal-6",
      "name": "Ceia",
      "time": "22:00",
      "foods": ["Alimento 1"],
      "macros": {
        "calories": número,
        "protein": número,
        "carbs": número,
        "fats": número
      }
    }
  ],
  "status": "active"
}

IMPORTANTE:
- A soma dos macros de todas as refeições deve ser IGUAL aos dailyMacros
- Use alimentos reais e comuns no Brasil
- Respeite as restrições alimentares
- Priorize as preferências quando possível
- Retorne APENAS o JSON, sem texto adicional
- Use números arredondados (sem decimais)`;

		// Use faster model optimized for speed
		const { text } = await generateText({
			model: google("gemini-2.0-flash-exp"),
			prompt,
		});

		// Parse and validate the AI response
		let planData: unknown;
		try {
			// Try to extract JSON from the response
			const jsonMatch = text.match(/\{[\s\S]*\}/);
			if (!jsonMatch) {
				throw new Error("No JSON found in AI response");
			}
			planData = JSON.parse(jsonMatch[0]);
		} catch {
			console.error("Failed to parse AI response:", text);
			throw new Error("IA retornou resposta inválida");
		}

		// Validate the structure
		const validatedPlan = nutritionPlanSchema.parse(planData);

		return new Response(JSON.stringify(validatedPlan), {
			status: 200,
			headers: { "Content-Type": "application/json", ...corsHeaders },
		});
	} catch (error) {
		console.error("Error generating nutrition plan:", error);

		if (error instanceof z.ZodError) {
			return new Response(
				JSON.stringify({ error: "Dados inválidos", details: error.errors }),
				{
					status: 400,
					headers: { "Content-Type": "application/json", ...corsHeaders },
				},
			);
		}

		return new Response(
			JSON.stringify({
				error:
					error instanceof Error
						? error.message
						: "Erro ao gerar plano nutricional",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json", ...corsHeaders },
			},
		);
	}
}

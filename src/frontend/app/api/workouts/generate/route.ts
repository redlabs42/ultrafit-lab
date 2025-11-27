import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { z } from "zod";

// Vercel Free Tier limit: 10 seconds
// Pro Tier allows up to 60 seconds
export const maxDuration = 30;

// Input validation schema
const generateWorkoutSchema = z.object({
  goal: z.string(),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  daysPerWeek: z.number().min(1).max(7),
  equipment: z.array(z.string()).optional(),
});

// Response schema for workout plan
const workoutPlanSchema = z.object({
  name: z.string(),
  description: z.string(),
  workouts: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      dayOfWeek: z.number().optional(),
      exercises: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          sets: z.number(),
          reps: z.string(), // string to allow ranges like "10-12"
          rest: z.number(), // seconds
          notes: z.string().optional(),
        })
      ),
    })
  ),
  schedule: z.array(
    z.object({
      dayOfWeek: z.number(),
      workoutId: z.string(),
    })
  ),
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
  console.log("Workout generation API called");
  try {
    const body = await req.json();
    console.log("Request body:", body);
    const { goal, experience, daysPerWeek, equipment } =
      generateWorkoutSchema.parse(body);

    // Build context for the prompt
    const equipmentText = equipment?.length
      ? `Equipamentos disponíveis: ${equipment.join(", ")}`
      : "Equipamentos: Academia completa";

    const prompt = `Você é um personal trainer especializado. Crie um plano de treino completo e detalhado.

Objetivo: ${goal}
Nível de Experiência: ${experience}
Frequência: ${daysPerWeek} dias por semana
${equipmentText}

Crie um plano de treino no formato JSON com a seguinte estrutura EXATA:
{
  "name": "Nome do plano (ex: Hipertrofia Iniciante A/B)",
  "description": "Descrição breve do plano e foco",
  "workouts": [
    {
      "id": "workout-1",
      "name": "Treino A - Peito e Tríceps",
      "description": "Foco em empurrar",
      "exercises": [
        {
          "id": "ex-1",
          "name": "Supino Reto",
          "sets": 4,
          "reps": "10-12",
          "rest": 60,
          "notes": "Focar na descida controlada"
        }
      ]
    }
  ],
  "schedule": [
    { "dayOfWeek": 1, "workoutId": "workout-1" },
    { "dayOfWeek": 3, "workoutId": "workout-2" }
  ]
}

IMPORTANTE:
- Crie ${daysPerWeek} treinos diferentes ou distribua em uma divisão lógica (ex: ABC, Upper/Lower)
- O array "schedule" deve mapear os dias da semana (0=Domingo, 1=Segunda, ..., 6=Sábado) para os IDs dos treinos
- Use exercícios reais e nomes em Português
- Adapte volume e intensidade para o nível ${experience}
- Respeite os equipamentos disponíveis
- Retorne APENAS o JSON, sem texto adicional`;

    // Use faster model optimized for speed
    const { text } = await generateText({
      model: google("gemini-1.5-flash-latest"),
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
    const validatedPlan = workoutPlanSchema.parse(planData);

    return new Response(JSON.stringify(validatedPlan), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error generating workout plan:", error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Dados inválidos", details: error.errors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao gerar plano de treino",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
}

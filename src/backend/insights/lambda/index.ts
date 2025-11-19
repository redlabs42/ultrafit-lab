/**
 * Lambda para análise de dados e insights do usuário.
 * Calcula progresso, métricas de saúde, etc.
 */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { logger, createSuccessResponse, createErrorResponse, getUserIdFromEvent } from '../../common/lambda/index.js';

/**
 * Handler principal da Lambda de insights.
 * 
 * Rotas:
 * - GET /insights/progress: Progresso do usuário
 * - GET /insights/metrics: Métricas de saúde
 */
export async function handler(
  event: APIGatewayProxyEvent,
  _context: unknown
): Promise<APIGatewayProxyResult> {
  try {
    const httpMethod = event.httpMethod;
    const path = event.path;
    const userId = getUserIdFromEvent(event);
    
    if (!userId) {
      return createErrorResponse('Usuário não autenticado', 401);
    }
    
    logger.info({ method: httpMethod, path, userId }, 'insights_lambda_invoked');
    
    if (httpMethod === 'GET' && path.includes('/progress')) {
      return await handleGetProgress(userId);
    }
    
    if (httpMethod === 'GET' && path.includes('/metrics')) {
      return await handleGetMetrics(userId);
    }
    
    return createErrorResponse('Rota não encontrada', 404);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    logger.error({ error: errorMessage, stack: error instanceof Error ? error.stack : undefined }, 'insights_lambda_error');
    
    return createErrorResponse(
      `Erro ao processar insights: ${errorMessage}`,
      500
    );
  }
}

/**
 * Calcula progresso do usuário
 */
async function handleGetProgress(userId: string): Promise<APIGatewayProxyResult> {
  // TODO: Buscar dados do DynamoDB
  // TODO: Calcular progresso
  // TODO: Retornar insights
  
  // Exemplo simplificado
  const progressData = {
    workouts_completed: 0,
    nutrition_goals_met: 0,
    streak_days: 0
  };
  
  logger.info({ userId }, 'progress_calculated');
  
  return createSuccessResponse(progressData);
}

/**
 * Calcula métricas de saúde
 */
async function handleGetMetrics(userId: string): Promise<APIGatewayProxyResult> {
  // TODO: Buscar dados históricos
  // TODO: Calcular métricas
  // TODO: Retornar análise
  
  const metrics = {
    avg_workout_duration: 0,
    calories_burned: 0,
    nutrition_score: 0
  };
  
  logger.info({ userId }, 'metrics_calculated');
  
  return createSuccessResponse(metrics);
}


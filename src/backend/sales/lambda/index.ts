/**
 * Lambda para gestão de vendas e conversões.
 */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { logger, createSuccessResponse, createErrorResponse } from '../../common/lambda/index.js';

/**
 * Handler principal da Lambda de vendas.
 */
export async function handler(
  event: APIGatewayProxyEvent,
  _context: unknown
): Promise<APIGatewayProxyResult> {
  try {
    const httpMethod = event.httpMethod;
    const path = event.path;
    
    logger.info({ method: httpMethod, path }, 'sales_lambda_invoked');
    
    // TODO: Implementar rotas de vendas
    return createSuccessResponse({ message: 'Sales endpoint' });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    logger.error({ error: errorMessage, stack: error instanceof Error ? error.stack : undefined }, 'sales_lambda_error');
    
    return createErrorResponse(
      `Erro ao processar venda: ${errorMessage}`,
      500
    );
  }
}


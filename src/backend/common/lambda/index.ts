/**
 * Lambda function base com utilitários compartilhados.
 * Este módulo contém funções auxiliares usadas por outras Lambdas.
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import pino from "pino";

// Configurar logging estruturado
export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: { colorize: true },
        }
      : undefined,
});

// Cliente DynamoDB (reutilizável)
const dynamodbClient = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
});

export const dynamodb = DynamoDBDocumentClient.from(dynamodbClient);

/**
 * Interface para resposta padronizada
 */
export interface LambdaResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

/**
 * Cria resposta de sucesso padronizada
 */
export function createSuccessResponse(
  data: Record<string, unknown>,
  statusCode = 200
): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    },
    body: JSON.stringify({
      success: true,
      data,
    }),
  };
}

/**
 * Cria resposta de erro padronizada
 */
export function createErrorResponse(
  error: string,
  statusCode = 500
): APIGatewayProxyResult {
  logger.error({ error, statusCode }, "lambda_error");

  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    },
    body: JSON.stringify({
      success: false,
      error,
    }),
  };
}

/**
 * Extrai user_id do evento (do Cognito ou do path)
 */
export function getUserIdFromEvent(event: APIGatewayProxyEvent): string | null {
  // Extrair de requestContext.authorizer.claims.sub (Cognito)
  const requestContext = event.requestContext;
  const authorizer = requestContext.authorizer;

  if (authorizer && typeof authorizer === "object" && "claims" in authorizer) {
    const claims = authorizer.claims as { sub?: string };
    if (claims.sub) {
      return claims.sub;
    }
  }

  // Fallback: extrair de pathParameters
  const userId = event.pathParameters?.userId;
  if (userId) {
    return userId;
  }

  return null;
}

/**
 * Parse do body do evento (pode ser string ou objeto)
 */
export function parseEventBody<T = Record<string, unknown>>(
  event: APIGatewayProxyEvent
): T {
  if (!event.body) {
    return {} as T;
  }

  try {
    return JSON.parse(event.body) as T;
  } catch {
    return {} as T;
  }
}

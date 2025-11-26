/**
 * Lambda para processamento de pagamentos via Asaas.
 * Gerencia assinaturas, webhooks e status de pagamento.
 */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { z } from 'zod';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { logger, createSuccessResponse, createErrorResponse, getUserIdFromEvent, parseEventBody, dynamodb } from '../../common/lambda/index.js';

// Configuração Asaas
const ASAAS_API_KEY = process.env.ASAAS_API_KEY || '';
const ASAAS_BASE_URL = process.env.ASAAS_BASE_URL || 'https://api.asaas.com/v3';
const ASAAS_WEBHOOK_TOKEN = process.env.ASAAS_WEBHOOK_TOKEN || '';
const USERS_TABLE = process.env.DYNAMODB_USERS_TABLE || 'users-table';

// Schemas de validação
const createSubscriptionSchema = z.object({
  customer_id: z.string().min(1),
  billing_type: z.enum(['CREDIT_CARD', 'BOLETO', 'PIX']).default('CREDIT_CARD'),
  value: z.number().positive(),
  next_due_date: z.string(),
  cycle: z.enum(['WEEKLY', 'BIWEEKLY', 'MONTHLY', 'QUARTERLY', 'SEMIANNUALLY', 'YEARLY']).default('MONTHLY')
});

type CreateSubscriptionRequest = z.infer<typeof createSubscriptionSchema>;

/**
 * Handler principal da Lambda de pagamentos.
 * 
 * Rotas:
 * - POST /payments/subscription: Criar assinatura
 * - POST /payments/webhook: Receber webhook do Asaas
 * - GET /payments/status/{subscriptionId}: Verificar status
 */
export async function handler(
  event: APIGatewayProxyEvent,
  _context: unknown
): Promise<APIGatewayProxyResult> {
  try {
    const httpMethod = event.httpMethod;
    const path = event.path;

    logger.info({ method: httpMethod, path }, 'payments_lambda_invoked');

    // Webhook do Asaas
    if (httpMethod === 'POST' && path.includes('/webhook')) {
      return await handleWebhook(event);
    }

    // Criar assinatura
    if (httpMethod === 'POST' && path.includes('/subscription')) {
      return await handleCreateSubscription(event);
    }

    // Verificar status
    if (httpMethod === 'GET' && path.includes('/status')) {
      return await handleGetStatus(event);
    }

    return createErrorResponse('Rota não encontrada', 404);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    logger.error({ error: errorMessage, stack: error instanceof Error ? error.stack : undefined }, 'payments_lambda_error');

    return createErrorResponse(
      `Erro ao processar pagamento: ${errorMessage}`,
      500
    );
  }
}

/**
 * Cria uma nova assinatura no Asaas
 */
async function handleCreateSubscription(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const body = parseEventBody<CreateSubscriptionRequest>(event);
  const validation = createSubscriptionSchema.safeParse(body);

  if (!validation.success) {
    return createErrorResponse(
      `Dados inválidos: ${validation.error.errors.map(e => e.message).join(', ')}`,
      400
    );
  }

  const subscriptionData = validation.data;
  const userId = getUserIdFromEvent(event);

  // Preparar requisição para Asaas
  const asaasPayload = {
    customer: subscriptionData.customer_id,
    billingType: subscriptionData.billing_type,
    value: subscriptionData.value,
    nextDueDate: subscriptionData.next_due_date,
    cycle: subscriptionData.cycle,
    externalReference: userId // Vincula o usuário à assinatura no Asaas
  };

  try {
    const response = await fetch(`${ASAAS_BASE_URL}/subscriptions`, {
      method: 'POST',
      headers: {
        'access_token': ASAAS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(asaasPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Asaas API error: ${errorText}`);
    }

    const result = await response.json() as { id: string; status: string };

    // Atualizar usuário no DynamoDB
    await dynamodb.send(new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { user_id: userId },
      UpdateExpression: 'SET subscriptionId = :sid, subscriptionStatus = :status, plan = :plan, updatedAt = :now',
      ExpressionAttributeValues: {
        ':sid': result.id,
        ':status': result.status,
        ':plan': 'PREMIUM', // Assumindo Premium por enquanto
        ':now': new Date().toISOString()
      }
    }));

    logger.info({ userId, subscriptionId: result.id }, 'subscription_created_and_db_updated');

    return createSuccessResponse({
      subscription_id: result.id,
      status: result.status
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro ao criar assinatura';
    logger.error({ error: errorMessage }, 'subscription_creation_failed');
    return createErrorResponse(errorMessage, 500);
  }
}

/**
 * Processa webhook do Asaas
 */
async function handleWebhook(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  // Validar token do webhook
  const webhookToken = event.headers['asaas-access-token'] || event.headers['Asaas-Access-Token'];

  if (webhookToken !== ASAAS_WEBHOOK_TOKEN) {
    return createErrorResponse('Token inválido', 401);
  }

  const body = parseEventBody<{ event?: string; payment?: { id?: string; externalReference?: string; paymentDate?: string } }>(event);
  const eventType = body.event;

  logger.info({ eventType }, 'webhook_received');

  // Processar diferentes tipos de eventos
  const payment = body.payment || {};
  const userId = payment.externalReference;

  if (!userId) {
    logger.warn({ eventType, paymentId: payment.id }, 'webhook_missing_user_id');
    // Não retornamos erro para não travar o webhook do Asaas, apenas logamos
    return createSuccessResponse({ processed: false, reason: 'missing_external_reference' });
  }

  if (eventType === 'PAYMENT_RECEIVED') {
    await dynamodb.send(new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { user_id: userId },
      UpdateExpression: 'SET subscriptionStatus = :status, lastPaymentDate = :date, updatedAt = :now',
      ExpressionAttributeValues: {
        ':status': 'ACTIVE',
        ':date': payment.paymentDate || new Date().toISOString(),
        ':now': new Date().toISOString()
      }
    }));
    logger.info({ userId, eventType }, 'payment_received_processed');
  } else if (eventType === 'PAYMENT_OVERDUE') {
    await dynamodb.send(new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { user_id: userId },
      UpdateExpression: 'SET subscriptionStatus = :status, updatedAt = :now',
      ExpressionAttributeValues: {
        ':status': 'OVERDUE',
        ':now': new Date().toISOString()
      }
    }));
    logger.info({ userId, eventType }, 'payment_overdue_processed');
  }

  return createSuccessResponse({ processed: true });
}

/**
 * Verifica status de uma assinatura
 */
async function handleGetStatus(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const subscriptionId = event.pathParameters?.subscriptionId;

  if (!subscriptionId) {
    return createErrorResponse('subscriptionId não fornecido', 400);
  }

  try {
    const response = await fetch(`${ASAAS_BASE_URL}/subscriptions/${subscriptionId}`, {
      method: 'GET',
      headers: {
        'access_token': ASAAS_API_KEY
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Asaas API error: ${errorText}`);
    }

    const result = await response.json() as { id: string; status: string; value: number };

    return createSuccessResponse({
      subscription_id: result.id,
      status: result.status,
      value: result.value
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar status';
    logger.error({ error: errorMessage }, 'get_status_failed');
    return createErrorResponse(errorMessage, 500);
  }
}


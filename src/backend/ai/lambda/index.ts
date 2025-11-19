/**
 * Lambda para integração com modelos de IA (OpenAI, Anthropic).
 * Responsável por conversação sobre nutrição e treinos.
 */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { z } from 'zod';
import { logger, createSuccessResponse, createErrorResponse, getUserIdFromEvent, parseEventBody } from '../../common/lambda/index.js';

// Clientes de IA
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Schema de validação para requisição
const aiRequestSchema = z.object({
  message: z.string().min(1, 'Mensagem não pode estar vazia'),
  provider: z.enum(['anthropic', 'openai']).optional().default('anthropic')
});

type AIRequest = z.infer<typeof aiRequestSchema>;

/**
 * Handler principal da Lambda de IA.
 * 
 * Recebe mensagens do usuário e retorna respostas da IA sobre nutrição/treinos.
 */
export async function handler(
  event: APIGatewayProxyEvent,
  _context: unknown
): Promise<APIGatewayProxyResult> {
  try {
    logger.info({ event }, 'ai_lambda_invoked');
    
    // Extrair e validar dados do evento
    const body = parseEventBody<AIRequest>(event);
    const validation = aiRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return createErrorResponse(
        `Dados inválidos: ${validation.error.errors.map(e => e.message).join(', ')}`,
        400
      );
    }
    
    const { message, provider } = validation.data;
    const userId = getUserIdFromEvent(event);
    
    logger.info({ userId, provider, messageLength: message.length }, 'processing_ai_request');
    
    let aiResponse: string;
    
    if (provider === 'anthropic') {
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: message
        }]
      });
      
      aiResponse = response.content[0].type === 'text' 
        ? response.content[0].text 
        : 'Resposta não disponível';
    } else {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{
          role: 'user',
          content: message
        }],
        max_tokens: 1024
      });
      
      aiResponse = response.choices[0]?.message?.content || 'Resposta não disponível';
    }
    
    logger.info({ userId, provider, responseLength: aiResponse.length }, 'ai_response_generated');
    
    return createSuccessResponse({
      message: aiResponse,
      provider
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    logger.error({ error: errorMessage, stack: error instanceof Error ? error.stack : undefined }, 'ai_lambda_error');
    
    return createErrorResponse(
      `Erro ao processar mensagem: ${errorMessage}`,
      500
    );
  }
}


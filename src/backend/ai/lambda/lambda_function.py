"""
Lambda para integração com modelos de IA (OpenAI, Anthropic).
Responsável por conversação sobre nutrição e treinos.
"""
import json
import os
from typing import Dict, Any
import structlog
from openai import OpenAI
from anthropic import Anthropic

logger = structlog.get_logger()

# Clientes de IA
openai_client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
anthropic_client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))


def create_success_response(data: Dict[str, Any], status_code: int = 200) -> Dict[str, Any]:
    """Cria resposta de sucesso padronizada"""
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'data': data})
    }


def create_error_response(error: str, status_code: int = 500) -> Dict[str, Any]:
    """Cria resposta de erro padronizada"""
    logger.error("ai_lambda_error", error=error, status_code=status_code)
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': False, 'error': error})
    }


def get_user_id_from_event(event: Dict[str, Any]) -> str | None:
    """Extrai user_id do evento (do Cognito ou do path)"""
    request_context = event.get('requestContext', {})
    authorizer = request_context.get('authorizer', {})
    claims = authorizer.get('claims', {})
    return claims.get('sub') or event.get('pathParameters', {}).get('userId')


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Handler principal da Lambda de IA.
    
    Recebe mensagens do usuário e retorna respostas da IA sobre nutrição/treinos.
    """
    try:
        logger.info("ai_lambda_invoked", event=event)
        
        # Extrair dados do evento
        body = json.loads(event.get('body', '{}'))
        message = body.get('message', '')
        user_id = get_user_id_from_event(event)
        
        if not message:
            return create_error_response("Mensagem não fornecida", 400)
        
        # Escolher provider (por padrão Anthropic)
        provider = body.get('provider', 'anthropic')
        
        if provider == 'anthropic':
            response = anthropic_client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=1024,
                messages=[{
                    "role": "user",
                    "content": message
                }]
            )
            ai_response = response.content[0].text
        else:  # OpenAI
            response = openai_client.chat.completions.create(
                model="gpt-4",
                messages=[{
                    "role": "user",
                    "content": message
                }]
            )
            ai_response = response.choices[0].message.content
        
        logger.info("ai_response_generated", user_id=user_id, provider=provider)
        
        return create_success_response({
            'message': ai_response,
            'provider': provider
        })
        
    except Exception as e:
        logger.error("ai_lambda_error", error=str(e), exc_info=True)
        return create_error_response(f"Erro ao processar mensagem: {str(e)}")


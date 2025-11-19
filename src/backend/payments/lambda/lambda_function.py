"""
Lambda para processamento de pagamentos via Asaas.
Gerencia assinaturas, webhooks e status de pagamento.
"""
import json
import os
from typing import Dict, Any
import structlog
import httpx

logger = structlog.get_logger()

# Configuração Asaas
ASAAS_API_KEY = os.getenv('ASAAS_API_KEY')
ASAAS_BASE_URL = os.getenv('ASAAS_BASE_URL', 'https://api.asaas.com/v3')
ASAAS_WEBHOOK_TOKEN = os.getenv('ASAAS_WEBHOOK_TOKEN')


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
    logger.error("payments_lambda_error", error=error, status_code=status_code)
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': False, 'error': error})
    }


def get_user_id_from_event(event: Dict[str, Any]) -> str | None:
    """Extrai user_id do evento"""
    request_context = event.get('requestContext', {})
    authorizer = request_context.get('authorizer', {})
    claims = authorizer.get('claims', {})
    return claims.get('sub') or event.get('pathParameters', {}).get('userId')


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Handler principal da Lambda de pagamentos.
    
    Rotas:
    - POST /payments/subscription: Criar assinatura
    - POST /payments/webhook: Receber webhook do Asaas
    - GET /payments/status/{subscriptionId}: Verificar status
    """
    try:
        http_method = event.get('httpMethod', '')
        path = event.get('path', '')
        
        logger.info("payments_lambda_invoked", method=http_method, path=path)
        
        # Webhook do Asaas
        if http_method == 'POST' and '/webhook' in path:
            return handle_webhook(event)
        
        # Criar assinatura
        elif http_method == 'POST' and '/subscription' in path:
            return handle_create_subscription(event)
        
        # Verificar status
        elif http_method == 'GET' and '/status' in path:
            return handle_get_status(event)
        
        else:
            return create_error_response("Rota não encontrada", 404)
            
    except Exception as e:
        logger.error("payments_lambda_error", error=str(e), exc_info=True)
        return create_error_response(f"Erro ao processar pagamento: {str(e)}")


def handle_create_subscription(event: Dict[str, Any]) -> Dict[str, Any]:
    """Cria uma nova assinatura no Asaas"""
    body = json.loads(event.get('body', '{}'))
    user_id = get_user_id_from_event(event)
    
    # Preparar requisição para Asaas
    subscription_data = {
        'customer': body.get('customer_id'),
        'billingType': body.get('billing_type', 'CREDIT_CARD'),
        'value': body.get('value'),
        'nextDueDate': body.get('next_due_date'),
        'cycle': body.get('cycle', 'MONTHLY')
    }
    
    with httpx.Client() as client:
        response = client.post(
            f"{ASAAS_BASE_URL}/subscriptions",
            json=subscription_data,
            headers={
                'access_token': ASAAS_API_KEY,
                'Content-Type': 'application/json'
            }
        )
        response.raise_for_status()
        result = response.json()
    
    logger.info("subscription_created", user_id=user_id, subscription_id=result.get('id'))
    
    return create_success_response({
        'subscription_id': result.get('id'),
        'status': result.get('status')
    })


def handle_webhook(event: Dict[str, Any]) -> Dict[str, Any]:
    """Processa webhook do Asaas"""
    # Validar token do webhook
    webhook_token = event.get('headers', {}).get('asaas-access-token')
    if webhook_token != ASAAS_WEBHOOK_TOKEN:
        return create_error_response("Token inválido", 401)
    
    body = json.loads(event.get('body', '{}'))
    event_type = body.get('event')
    
    logger.info("webhook_received", event_type=event_type)
    
    # Processar diferentes tipos de eventos
    if event_type == 'PAYMENT_RECEIVED':
        # Atualizar status do usuário
        # Salvar no DynamoDB
        pass
    elif event_type == 'PAYMENT_OVERDUE':
        # Notificar usuário
        pass
    
    return create_success_response({'processed': True})


def handle_get_status(event: Dict[str, Any]) -> Dict[str, Any]:
    """Verifica status de uma assinatura"""
    subscription_id = event.get('pathParameters', {}).get('subscriptionId')
    
    with httpx.Client() as client:
        response = client.get(
            f"{ASAAS_BASE_URL}/subscriptions/{subscription_id}",
            headers={'access_token': ASAAS_API_KEY}
        )
        response.raise_for_status()
        result = response.json()
    
    return create_success_response({
        'subscription_id': result.get('id'),
        'status': result.get('status'),
        'value': result.get('value')
    })


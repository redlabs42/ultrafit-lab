"""
Lambda para gestão de vendas e conversões.
"""
import json
from typing import Dict, Any
import structlog

logger = structlog.get_logger()


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
    logger.error("sales_lambda_error", error=error, status_code=status_code)
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': False, 'error': error})
    }


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Handler principal da Lambda de vendas.
    """
    try:
        http_method = event.get('httpMethod', '')
        path = event.get('path', '')
        
        logger.info("sales_lambda_invoked", method=http_method, path=path)
        
        # TODO: Implementar rotas de vendas
        return create_success_response({'message': 'Sales endpoint'})
        
    except Exception as e:
        logger.error("sales_lambda_error", error=str(e), exc_info=True)
        return create_error_response(f"Erro ao processar venda: {str(e)}")


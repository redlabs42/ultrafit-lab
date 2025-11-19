"""
Lambda function base com utilitários compartilhados.
Este módulo contém funções auxiliares usadas por outras Lambdas.
"""
import json
import os
from typing import Dict, Any, Optional
import structlog
import boto3
from pydantic import BaseModel

# Configurar logging estruturado
logger = structlog.get_logger()

# Cliente DynamoDB (reutilizável)
dynamodb = boto3.resource('dynamodb', region_name=os.getenv('AWS_REGION', 'us-east-1'))


class LambdaResponse(BaseModel):
    """Modelo de resposta padronizado para Lambdas"""
    status_code: int
    body: Dict[str, Any]
    headers: Optional[Dict[str, str]] = None

    def to_dict(self) -> Dict[str, Any]:
        """Converte para formato de resposta da API Gateway"""
        return {
            'statusCode': self.status_code,
            'headers': self.headers or {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(self.body)
        }


def create_success_response(data: Dict[str, Any], status_code: int = 200) -> Dict[str, Any]:
    """Cria resposta de sucesso padronizada"""
    response = LambdaResponse(
        status_code=status_code,
        body={'success': True, 'data': data}
    )
    return response.to_dict()


def create_error_response(error: str, status_code: int = 500) -> Dict[str, Any]:
    """Cria resposta de erro padronizada"""
    logger.error("lambda_error", error=error, status_code=status_code)
    response = LambdaResponse(
        status_code=status_code,
        body={'success': False, 'error': error}
    )
    return response.to_dict()


def get_user_id_from_event(event: Dict[str, Any]) -> Optional[str]:
    """Extrai user_id do evento (do Cognito ou do path)"""
    # Exemplo: extrair de requestContext.authorizer.claims.sub
    request_context = event.get('requestContext', {})
    authorizer = request_context.get('authorizer', {})
    claims = authorizer.get('claims', {})
    return claims.get('sub') or event.get('pathParameters', {}).get('userId')


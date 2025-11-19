"""
Lambda para análise de dados e insights do usuário.
Calcula progresso, métricas de saúde, etc.
"""
import json
from typing import Dict, Any
import structlog
import pandas as pd
import numpy as np
import boto3
import os

logger = structlog.get_logger()

# Cliente DynamoDB
dynamodb = boto3.resource('dynamodb', region_name=os.getenv('AWS_REGION', 'us-east-1'))


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
    logger.error("insights_lambda_error", error=error, status_code=status_code)
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
    Handler principal da Lambda de insights.
    
    Rotas:
    - GET /insights/progress: Progresso do usuário
    - GET /insights/metrics: Métricas de saúde
    """
    try:
        http_method = event.get('httpMethod', '')
        path = event.get('path', '')
        user_id = get_user_id_from_event(event)
        
        logger.info("insights_lambda_invoked", method=http_method, path=path, user_id=user_id)
        
        if http_method == 'GET' and '/progress' in path:
            return handle_get_progress(user_id)
        elif http_method == 'GET' and '/metrics' in path:
            return handle_get_metrics(user_id)
        else:
            return create_error_response("Rota não encontrada", 404)
            
    except Exception as e:
        logger.error("insights_lambda_error", error=str(e), exc_info=True)
        return create_error_response(f"Erro ao processar insights: {str(e)}")


def handle_get_progress(user_id: str) -> Dict[str, Any]:
    """Calcula progresso do usuário"""
    # TODO: Buscar dados do DynamoDB
    # TODO: Calcular progresso com pandas
    # TODO: Retornar insights
    
    # Exemplo simplificado
    progress_data = {
        'workouts_completed': 0,
        'nutrition_goals_met': 0,
        'streak_days': 0
    }
    
    return create_success_response(progress_data)


def handle_get_metrics(user_id: str) -> Dict[str, Any]:
    """Calcula métricas de saúde"""
    # TODO: Buscar dados históricos
    # TODO: Calcular métricas com numpy/pandas
    # TODO: Retornar análise
    
    metrics = {
        'avg_workout_duration': 0,
        'calories_burned': 0,
        'nutrition_score': 0
    }
    
    return create_success_response(metrics)


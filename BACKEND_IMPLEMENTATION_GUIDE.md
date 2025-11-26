# Guia de Implementação do Backend - Ultrafit Lab

## 📋 Status Atual

### ✅ Implementado
- [x] Estrutura base de Lambdas
- [x] Lambda de IA (OpenAI/Anthropic)
- [x] Lambda de Pagamentos (Asaas)
- [x] Utilitários comuns (logging, responses)
- [x] Configuração TypeScript

### ⏳ Pendente
- [ ] Integração com Cognito para autenticação
- [ ] Endpoints de Nutrição
- [ ] Endpoints de Treino
- [ ] Endpoints de Perfil de Usuário
- [ ] Integração com DynamoDB
- [ ] Testes unitários
- [ ] Deploy via Pulumi

---

## 🎯 Próximos Passos de Implementação

### 1. Configurar Autenticação com Cognito

#### Atualizar Common Lambda Utils

Adicionar middleware de autenticação:

```typescript
// src/backend/common/lambda/auth.ts
import { APIGatewayProxyEvent } from 'aws-lambda';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  tokenUse: 'access',
  clientId: process.env.COGNITO_CLIENT_ID!,
});

export async function verifyToken(event: APIGatewayProxyEvent): Promise<string> {
  const token = event.headers.Authorization?.replace('Bearer ', '');
  
  if (!token) {
    throw new Error('Token não fornecido');
  }
  
  try {
    const payload = await verifier.verify(token);
    return payload.sub; // User ID
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
}
```

---

### 2. Implementar Endpoints de Nutrição

#### Criar Lambda de Nutrição

```typescript
// src/backend/nutrition/lambda/index.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { z } from 'zod';
import { verifyToken } from '../../common/lambda/auth.js';
import { createSuccessResponse, createErrorResponse, parseEventBody } from '../../common/lambda/index.js';

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

// Schema de validação
const nutritionPlanSchema = z.object({
  goal: z.enum(['weight_loss', 'muscle_gain', 'maintenance']),
  targetCalories: z.number().min(1000).max(5000),
  mealsPerDay: z.number().min(3).max(6),
  dietaryRestrictions: z.array(z.string()).optional(),
  preferences: z.array(z.string()).optional(),
});

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    // Verificar autenticação
    const userId = await verifyToken(event);
    
    const method = event.httpMethod;
    const path = event.path;
    
    // Roteamento
    if (method === 'POST' && path.includes('/generate')) {
      return await generateNutritionPlan(event, userId);
    } else if (method === 'GET' && path.includes('/plans')) {
      return await getUserPlans(userId);
    } else if (method === 'GET' && path.match(/\/plans\/[^/]+$/)) {
      const planId = path.split('/').pop()!;
      return await getPlan(userId, planId);
    }
    
    return createErrorResponse('Rota não encontrada', 404);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return createErrorResponse(errorMessage, 500);
  }
}

async function generateNutritionPlan(
  event: APIGatewayProxyEvent,
  userId: string
): Promise<APIGatewayProxyResult> {
  const body = parseEventBody(event);
  const validation = nutritionPlanSchema.safeParse(body);
  
  if (!validation.success) {
    return createErrorResponse('Dados inválidos', 400);
  }
  
  const data = validation.data;
  
  // Gerar plano com IA (integrar com Lambda de IA)
  const plan = {
    id: `plan_${Date.now()}`,
    userId,
    ...data,
    meals: [], // Gerar com IA
    createdAt: new Date().toISOString(),
  };
  
  // Salvar no DynamoDB
  await docClient.send(new PutCommand({
    TableName: process.env.DYNAMODB_NUTRITION_TABLE,
    Item: plan,
  }));
  
  return createSuccessResponse(plan);
}

async function getUserPlans(userId: string): Promise<APIGatewayProxyResult> {
  const result = await docClient.send(new QueryCommand({
    TableName: process.env.DYNAMODB_NUTRITION_TABLE,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  }));
  
  return createSuccessResponse({ plans: result.Items || [] });
}

async function getPlan(userId: string, planId: string): Promise<APIGatewayProxyResult> {
  const result = await docClient.send(new GetCommand({
    TableName: process.env.DYNAMODB_NUTRITION_TABLE,
    Key: { userId, id: planId },
  }));
  
  if (!result.Item) {
    return createErrorResponse('Plano não encontrado', 404);
  }
  
  return createSuccessResponse(result.Item);
}
```

---

### 3. Implementar Endpoints de Treino

Similar à estrutura de nutrição, criar:

```typescript
// src/backend/workout/lambda/index.ts
// Endpoints:
// POST /workout/generate - Gerar plano de treino
// GET /workout/plans - Listar planos do usuário
// GET /workout/plans/:id - Obter plano específico
// GET /workout/exercises - Listar exercícios disponíveis
```

---

### 4. Implementar Endpoints de Perfil

```typescript
// src/backend/profile/lambda/index.ts
// Endpoints:
// GET /profile - Obter perfil do usuário
// PUT /profile - Atualizar perfil
// GET /profile/progress - Obter progresso
// POST /profile/progress - Registrar progresso
```

---

## 🗄️ Estrutura do DynamoDB

### Tabela: Users
```
PK: userId (String)
Attributes:
- email (String)
- name (String)
- createdAt (String)
- updatedAt (String)
- subscription (Map)
  - planId (String)
  - status (String)
  - expiresAt (String)
```

### Tabela: NutritionPlans
```
PK: userId (String)
SK: planId (String)
Attributes:
- goal (String)
- targetCalories (Number)
- mealsPerDay (Number)
- meals (List)
- createdAt (String)
- isActive (Boolean)
```

### Tabela: WorkoutPlans
```
PK: userId (String)
SK: planId (String)
Attributes:
- goal (String)
- experience (String)
- daysPerWeek (Number)
- workouts (List)
- createdAt (String)
- isActive (Boolean)
```

### Tabela: Progress
```
PK: userId (String)
SK: date (String)
Attributes:
- weight (Number)
- bodyFat (Number)
- measurements (Map)
- photos (List)
- notes (String)
```

---

## 🔧 Configuração Necessária

### 1. Instalar Dependências Adicionais

```bash
cd src/backend/common
npm install aws-jwt-verify

cd ../nutrition
npm install

cd ../workout
npm install

cd ../profile
npm install
```

### 2. Atualizar .env

```bash
# Adicionar ao .env
COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxx

# Tabelas DynamoDB (serão criadas pela infra)
DYNAMODB_USERS_TABLE=ultrafit-users-prod
DYNAMODB_NUTRITION_TABLE=ultrafit-nutrition-prod
DYNAMODB_WORKOUTS_TABLE=ultrafit-workouts-prod
DYNAMODB_PROGRESS_TABLE=ultrafit-progress-prod
```

### 3. Criar Estrutura de Pastas

```bash
cd src/backend

# Criar novos módulos
mkdir -p nutrition/lambda
mkdir -p workout/lambda
mkdir -p profile/lambda

# Copiar package.json base
cp ai/package.json nutrition/
cp ai/package.json workout/
cp ai/package.json profile/

# Atualizar nomes nos package.json
```

---

## 🧪 Testes

### Estrutura de Testes

```typescript
// src/backend/nutrition/lambda/index.test.ts
import { handler } from './index';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('Nutrition Lambda', () => {
  it('should generate nutrition plan', async () => {
    const event = {
      httpMethod: 'POST',
      path: '/nutrition/generate',
      headers: {
        Authorization: 'Bearer valid-token',
      },
      body: JSON.stringify({
        goal: 'weight_loss',
        targetCalories: 2000,
        mealsPerDay: 4,
      }),
    } as APIGatewayProxyEvent;
    
    const result = await handler(event);
    
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).data).toHaveProperty('id');
  });
});
```

---

## 🚀 Deploy

### Via Pulumi (Recomendado)

```typescript
// infra/pulumi/backend/index.ts
import * as aws from '@pulumi/aws';

// Criar Lambda de Nutrição
const nutritionLambda = new aws.lambda.Function('nutrition-lambda', {
  runtime: 'nodejs20.x',
  handler: 'index.handler',
  code: new pulumi.asset.FileArchive('../../../backend/dist/nutrition'),
  environment: {
    variables: {
      DYNAMODB_NUTRITION_TABLE: nutritionTable.name,
      COGNITO_USER_POOL_ID: userPool.id,
    },
  },
});

// Criar API Gateway
const api = new aws.apigatewayv2.Api('ultrafit-api', {
  protocolType: 'HTTP',
  corsConfiguration: {
    allowOrigins: ['https://ultrafit.com'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Authorization', 'Content-Type'],
  },
});
```

---

## 📊 Monitoramento

### CloudWatch Logs

Todas as Lambdas logam automaticamente para CloudWatch:

```typescript
// Logs estruturados com Pino
logger.info({ userId, action: 'generate_plan' }, 'nutrition_plan_generated');
logger.error({ error: err.message }, 'failed_to_generate_plan');
```

### Métricas

- Invocações por Lambda
- Duração média
- Taxa de erro
- Throttling

---

## 🔒 Segurança

### Checklist

- [x] Validação de entrada com Zod
- [x] Autenticação via Cognito JWT
- [x] Logging estruturado
- [ ] Rate limiting (API Gateway)
- [ ] Criptografia de dados sensíveis
- [ ] Auditoria de acessos
- [ ] Backup automático do DynamoDB

---

## 📚 Recursos

- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
- [Cognito JWT Verification](https://github.com/awslabs/aws-jwt-verify)
- [Zod Documentation](https://zod.dev/)

---

## ✅ Checklist de Implementação

### Fase 1: Setup (1-2 dias)
- [ ] Criar estrutura de pastas para nutrition/workout/profile
- [ ] Instalar dependências
- [ ] Configurar autenticação com Cognito
- [ ] Criar schemas de validação

### Fase 2: Endpoints Básicos (3-5 dias)
- [ ] Implementar endpoints de nutrição
- [ ] Implementar endpoints de treino
- [ ] Implementar endpoints de perfil
- [ ] Integrar com DynamoDB

### Fase 3: Integração com IA (2-3 dias)
- [ ] Conectar geração de planos com Lambda de IA
- [ ] Implementar prompts específicos
- [ ] Testar qualidade das respostas

### Fase 4: Testes (2-3 dias)
- [ ] Escrever testes unitários
- [ ] Testes de integração
- [ ] Testes de carga

### Fase 5: Deploy (1-2 dias)
- [ ] Configurar Pulumi
- [ ] Deploy em ambiente de staging
- [ ] Testes em staging
- [ ] Deploy em produção

**Total Estimado: 9-15 dias**

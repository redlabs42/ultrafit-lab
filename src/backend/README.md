# Ultrafit Lab - Backend (Node.js/TypeScript)

Backend serverless usando AWS Lambda com TypeScript.

## 📁 Estrutura

```
backend/
├── common/              # Código compartilhado
│   ├── lambda/
│   │   └── index.ts     # Utilitários (logging, responses, DynamoDB)
│   └── package.json
├── ai/                  # Integração com IA
│   ├── lambda/
│   │   └── index.ts     # Handler para OpenAI/Anthropic
│   └── package.json
├── payments/            # Pagamentos Asaas
│   ├── lambda/
│   │   └── index.ts     # Handler para assinaturas e webhooks
│   └── package.json
├── insights/           # Análise de dados
│   ├── lambda/
│   │   └── index.ts     # Handler para métricas e progresso
│   └── package.json
├── sales/              # Gestão de vendas
│   ├── lambda/
│   │   └── index.ts     # Handler para vendas
│   └── package.json
├── package.json        # Dependências principais
├── tsconfig.json       # Configuração TypeScript
└── .eslintrc.json     # Configuração ESLint
```

## 🚀 Instalação

### 1. Instalar dependências principais

```bash
cd src/backend
npm install
```

### 2. Instalar dependências de cada domínio

```bash
# Common (base)
cd common && npm install && cd ..

# AI
cd ai && npm install && cd ..

# Payments
cd payments && npm install && cd ..

# Insights
cd insights && npm install && cd ..

# Sales
cd sales && npm install && cd ..
```

### 3. Build

```bash
# Build de todos os módulos
npm run build

# Ou build individual
cd common && npm run build
cd ../ai && npm run build
# etc...
```

## 🛠️ Desenvolvimento

### Type Checking

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

### Estrutura de uma Lambda

Cada Lambda exporta uma função `handler` que recebe:
- `event`: APIGatewayProxyEvent (dados da requisição)
- `context`: Context (informações da execução)

```typescript
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createSuccessResponse, createErrorResponse } from '../../common/lambda/index.js';

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  try {
    // Sua lógica aqui
    return createSuccessResponse({ message: 'Hello' });
  } catch (error) {
    return createErrorResponse('Erro ao processar', 500);
  }
}
```

## 📦 Dependências Principais

- **@aws-sdk/client-dynamodb**: Cliente DynamoDB
- **@aws-sdk/lib-dynamodb**: Helpers para DynamoDB
- **@anthropic-ai/sdk**: SDK Anthropic (Claude)
- **openai**: SDK OpenAI (GPT)
- **zod**: Validação de schemas
- **pino**: Logging estruturado
- **@types/aws-lambda**: Tipos TypeScript para Lambda

## 🔧 Variáveis de Ambiente

Criar arquivo `.env` (não commitar):

```bash
# AWS
AWS_REGION=us-east-1
AWS_PROFILE=ultrafitlab

# AI
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Payments
ASAAS_API_KEY=...
ASAAS_WEBHOOK_TOKEN=...
ASAAS_BASE_URL=https://api.asaas.com/v3

# DynamoDB (criados pela infra)
DYNAMODB_USERS_TABLE=...
DYNAMODB_NUTRITION_TABLE=...
DYNAMODB_WORKOUTS_TABLE=...
```

## 🚢 Deploy

As Lambdas são deployadas via Pulumi (infraestrutura). O código compilado em `dist/` é empacotado e enviado para AWS Lambda.

## 📚 Documentação

- [AWS Lambda TypeScript](https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html)
- [AWS SDK v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/)
- [Zod](https://zod.dev/)
- [Pino](https://getpino.io/)


# Ultrafit Lab - Guia de Setup e Implementação

**Status**: Em desenvolvimento  
**Criado**: 2025-01-27  
**Projeto**: Ultrafit Lab

## 📋 Índice

1. [Status Atual do Projeto](#status-atual-do-projeto)
2. [O Que Já Existe](#o-que-já-existe)
3. [O Que Falta Implementar](#o-que-falta-implementar)
4. [Passo a Passo de Implementação](#passo-a-passo-de-implementação)
5. [Explicação do Backend (Para Iniciantes)](#explicação-do-backend-para-iniciantes)
6. [Checklist de Implementação](#checklist-de-implementação)

---

## ✅ Status Atual do Projeto

### O Que Já Existe

#### ✅ Estrutura de Diretórios

- ✅ `src/backend/` com domínios: `common`, `ai`, `insights`, `payments`, `sales`
- ✅ `src/frontend/` com Next.js 16 configurado
- ✅ `infra/pulumi/` com diretórios `bootstrap/` e `control-plane/`
- ✅ `scripts/` (diretório vazio)
- ✅ `iam-policies/` com `policies/` e `roles/`
- ✅ `.gitignore` configurado

#### ✅ Dependências Backend (Node.js/TypeScript)

- ✅ `package.json` em cada domínio:
  - `common/`: @aws-sdk, zod, pino (logging)
  - `ai/`: @anthropic-ai/sdk, openai, zod, pino
  - `payments/`: zod, pino
  - `insights/`: @aws-sdk, zod, pino
  - `sales/`: zod, pino
- ✅ TypeScript configurado (`tsconfig.json`)
- ✅ Estrutura modular com monorepo

#### ✅ Frontend

- ✅ Next.js 16 com React 19
- ✅ Dependências instaladas (axios, react-query, shadcn/ui, etc.)
- ✅ Estrutura básica de componentes

---

## ❌ O Que Falta Implementar

### 1. **Scripts de Automação** (Prioridade: Alta)

- [ ] `scripts/bootstrap.sh` - Deploy da infraestrutura bootstrap
- [ ] `scripts/control-plane.sh` - Deploy do control plane
- [ ] `scripts/dev-local.sh` - Ambiente de desenvolvimento local

### 2. **Arquivos de Configuração** (Prioridade: Alta)

- [ ] `src/frontend/.env.example` - Template de variáveis de ambiente
- [ ] `src/backend/.env.example` - Template de variáveis de ambiente
- [ ] `infra/.env.example` - Template de variáveis de ambiente

### 3. **Lambda Functions** (Prioridade: Alta) ✅ CONCLUÍDO

- [x] `src/backend/common/lambda/index.ts` - Função base compartilhada
- [x] `src/backend/ai/lambda/index.ts` - Integração com IA
- [x] `src/backend/payments/lambda/index.ts` - Processamento de pagamentos
- [x] `src/backend/insights/lambda/index.ts` - Análise de dados
- [x] `src/backend/sales/lambda/index.ts` - Gestão de vendas

### 4. **Infraestrutura Pulumi** (Prioridade: Alta)

- [ ] `infra/pulumi/bootstrap/` - Código Pulumi para bootstrap
- [ ] `infra/pulumi/control-plane/` - Código Pulumi para control plane

### 5. **Configuração AWS** (Prioridade: Média)

- [ ] AWS Profile "ultrafitlab" configurado
- [ ] Credenciais AWS validadas

### 6. **Documentação** (Prioridade: Baixa)

- [ ] README específico para cada domínio do backend
- [ ] Documentação de APIs

---

## 🚀 Passo a Passo de Implementação

### Fase 1: Configuração Inicial e Scripts

#### 1.1 Criar Scripts de Automação

**Criar `scripts/bootstrap.sh`**:

```bash
#!/bin/bash
set -euo pipefail

PROJECT_NAME="ultrafitlab"
AWS_PROFILE="ultrafitlab"
ENVIRONMENT="${ENVIRONMENT:-staging}"

export AWS_PROFILE="$AWS_PROFILE"
cd infra/pulumi/bootstrap

# Login no Pulumi (usar local inicialmente, depois S3)
pulumi login --local

# Selecionar ou criar stack
pulumi stack select "$ENVIRONMENT" || pulumi stack init "$ENVIRONMENT"

# Deploy
pulumi up
```

**Criar `scripts/control-plane.sh`**:

```bash
#!/bin/bash
set -euo pipefail

PROJECT_NAME="ultrafitlab"
AWS_PROFILE="ultrafitlab"
ENVIRONMENT="${ENVIRONMENT:-staging}"

export AWS_PROFILE="$AWS_PROFILE"
cd infra/pulumi/control-plane

# Login no Pulumi S3 (bucket criado pelo bootstrap)
# IMPORTANTE: Substituir pelo nome real do bucket após bootstrap
pulumi login s3://ultrafitlab-bootstrap-state-${ENVIRONMENT}

# Selecionar ou criar stack
pulumi stack select "$ENVIRONMENT" || pulumi stack init "$ENVIRONMENT"

# Deploy
pulumi up
```

**Criar `scripts/dev-local.sh`**:

```bash
#!/bin/bash
set -e

cd src/frontend

# Criar .env.local se não existir
if [ ! -f .env.local ]; then
    if [ -f .env.example ]; then
        cp .env.example .env.local
        echo "⚠️  Configure .env.local com valores do Cognito após deploy da infra"
    else
        echo "❌ Arquivo .env.example não encontrado. Crie-o primeiro."
        exit 1
    fi
fi

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências do frontend..."
    npm install
fi

# Iniciar servidor de desenvolvimento
echo "🚀 Iniciando servidor de desenvolvimento..."
npm run dev
```

**Dar permissão de execução**:

```bash
chmod +x scripts/*.sh
```

#### 1.2 Criar Arquivos .env.example

**Criar `src/frontend/.env.example`**:

```bash
# Cognito Configuration
NEXT_PUBLIC_COGNITO_USER_POOL_ID=
NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID=
NEXT_PUBLIC_COGNITO_DOMAIN=
NEXT_PUBLIC_COGNITO_REGION=us-east-1

# API Configuration
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Criar `src/backend/.env.example`**:

```bash
# AWS Configuration
AWS_REGION=us-east-1
AWS_PROFILE=ultrafitlab

# AI Providers
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Payment Provider (Asaas)
ASAAS_API_KEY=
ASAAS_WEBHOOK_TOKEN=
ASAAS_BASE_URL=https://api.asaas.com/v3

# DynamoDB Tables (serão criados pela infra)
DYNAMODB_USERS_TABLE=
DYNAMODB_NUTRITION_TABLE=
DYNAMODB_WORKOUTS_TABLE=
```

**Criar `infra/.env.example`**:

```bash
# AWS Configuration
AWS_PROFILE=ultrafitlab
AWS_REGION=us-east-1

# Pulumi Configuration
PULUMI_ACCESS_TOKEN=
```

---

### Fase 2: Lambda Functions (Backend) ✅ CONCLUÍDO

**✅ Todas as Lambdas foram migradas para TypeScript/Node.js!**

#### 2.1 Estrutura TypeScript

**Configuração base criada**:

- ✅ `src/backend/package.json` - Dependências principais
- ✅ `src/backend/tsconfig.json` - Configuração TypeScript
- ✅ `src/backend/.eslintrc.json` - Linter configurado
- ✅ Cada domínio tem seu próprio `package.json`

#### 2.2 Lambda Common (Código Compartilhado) ✅

**Arquivo criado: `src/backend/common/lambda/index.ts`**

Contém:

- `createSuccessResponse()` - Resposta de sucesso padronizada
- `createErrorResponse()` - Resposta de erro padronizada
- `getUserIdFromEvent()` - Extrai user_id do evento
- `parseEventBody()` - Parse seguro do body
- `logger` - Logger estruturado (Pino)
- `dynamodb` - Cliente DynamoDB configurado

#### 2.3 Lambda AI (Integração com IA) ✅

**Arquivo criado: `src/backend/ai/lambda/index.ts`**

Funcionalidades:

- Integração com OpenAI (GPT-4)
- Integração com Anthropic (Claude)
- Validação de entrada com Zod
- Logging estruturado

#### 2.4 Lambda Payments (Pagamentos Asaas) ✅

**Arquivo criado: `src/backend/payments/lambda/index.ts`**

Funcionalidades:

- Criar assinaturas no Asaas
- Processar webhooks
- Verificar status de assinaturas
- Validação com Zod

#### 2.5 Lambda Insights (Análise de Dados) ✅

**Arquivo criado: `src/backend/insights/lambda/index.ts`**

Funcionalidades:

- Calcular progresso do usuário
- Gerar métricas de saúde
- Integração com DynamoDB

#### 2.6 Lambda Sales (Gestão de Vendas) ✅

**Arquivo criado: `src/backend/sales/lambda/index.ts`**

Estrutura base criada, pronto para implementação.

---

### Instalação e Build

```bash
# 1. Instalar dependências principais
cd src/backend
npm install

# 2. Instalar dependências de cada domínio
cd common && npm install && cd ..
cd ai && npm install && cd ..
cd payments && npm install && cd ..
cd insights && npm install && cd ..
cd sales && npm install && cd ..

# 3. Build (compilar TypeScript)
npm run build

# 4. Type checking
npm run type-check

# 5. Lint
npm run lint
```

**📚 Ver `src/backend/README.md` para documentação completa.**

---

---

### Fase 3: Infraestrutura Pulumi

**⚠️ ATENÇÃO**: A infraestrutura Pulumi é complexa e depende do projeto base (WetrackWise). Você precisa:

1. **Copiar/adaptar código do projeto base** (cuidado para não alterar o original)
2. **Ou criar do zero** seguindo a estrutura do GUIA.md

#### 3.1 Bootstrap Infrastructure

O bootstrap cria:

- S3 bucket para estado do Pulumi
- IAM roles e policies básicas
- OIDC provider (se necessário)

**Estrutura esperada em `infra/pulumi/bootstrap/`**:

```
bootstrap/
├── Pulumi.yaml
├── index.ts (ou index.py)
└── package.json (se TypeScript)
```

#### 3.2 Control Plane Infrastructure

O control plane cria:

- Cognito User Pool
- API Gateway
- Lambda functions
- DynamoDB tables
- Integrações

**Estrutura esperada em `infra/pulumi/control-plane/`**:

```
control-plane/
├── Pulumi.yaml
├── index.ts (ou index.py)
└── package.json (se TypeScript)
```

**⚠️ RECOMENDAÇÃO**: Se você tem acesso ao projeto WetrackWise, peça para alguém da equipe ajudar a adaptar a infraestrutura, ou crie uma versão simplificada primeiro.

---

## 📚 Explicação do Backend (Para Iniciantes)

### O Que É AWS Lambda?

**AWS Lambda** é um serviço de computação serverless. Você escreve funções (código Python, Node.js, etc.) e a AWS executa elas quando necessário, sem você gerenciar servidores.

**Vantagens**:

- ✅ Não precisa gerenciar servidores
- ✅ Paga apenas pelo que usa
- ✅ Escala automaticamente
- ✅ Integração fácil com outros serviços AWS

### Estrutura de uma Lambda Function

```python
def lambda_handler(event, context):
    """
    Esta é a função principal que a AWS chama.

    event: Dados da requisição (HTTP, S3, etc.)
    context: Informações sobre a execução (não usado muito)
    """
    # Seu código aqui
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Hello'})
    }
```

### O Que É Cada Domínio?

#### `common/` - Código Compartilhado

- **O que faz**: Funções utilitárias usadas por todas as outras Lambdas
- **Exemplo**: Formatação de respostas, logging, acesso ao DynamoDB
- **Por que existe**: Evita duplicar código

#### `ai/` - Integração com IA

- **O que faz**: Conversa com modelos de IA (OpenAI, Anthropic)
- **Exemplo**: Usuário pergunta sobre nutrição → Lambda chama Claude/GPT → Retorna resposta
- **Quando usar**: Chat, geração de planos de treino/nutrição

#### `payments/` - Pagamentos

- **O que faz**: Processa pagamentos via Asaas
- **Exemplo**: Criar assinatura, receber webhook de pagamento confirmado
- **Quando usar**: Checkout, renovação de assinatura, webhooks

#### `insights/` - Análise de Dados

- **O que faz**: Calcula métricas e progresso do usuário
- **Exemplo**: Quantos treinos fez este mês? Progresso de peso? Calorias consumidas?
- **Quando usar**: Dashboard, relatórios, gráficos

#### `sales/` - Vendas

- **O que faz**: Gerencia vendas e conversões
- **Exemplo**: Tracking de conversões, funis de venda
- **Quando usar**: Analytics de vendas, relatórios comerciais

### Como as Lambdas Se Comunicam?

1. **API Gateway** → Recebe requisição HTTP do frontend
2. **API Gateway** → Chama Lambda apropriada
3. **Lambda** → Processa e retorna resposta
4. **API Gateway** → Envia resposta para frontend

```
Frontend (Next.js)
    ↓ HTTP Request
API Gateway
    ↓ Invoke
Lambda Function
    ↓ Processa
DynamoDB / S3 / Outros serviços
    ↓ Retorna
API Gateway
    ↓ HTTP Response
Frontend
```

### O Que É DynamoDB?

**DynamoDB** é um banco de dados NoSQL da AWS. Armazena dados em formato chave-valor.

**Exemplo de uso**:

```python
# Salvar dados do usuário
table = dynamodb.Table('users')
table.put_item(Item={
    'user_id': '123',
    'name': 'João',
    'email': 'joao@email.com'
})

# Buscar dados
response = table.get_item(Key={'user_id': '123'})
user = response['Item']
```

### O Que É Pulumi?

**Pulumi** é uma ferramenta de Infrastructure as Code (IaC). Você escreve código (TypeScript, Python) para criar recursos na AWS.

**Exemplo**:

```typescript
// Criar uma Lambda
const myLambda = new aws.lambda.Function("myFunction", {
  runtime: "python3.14",
  handler: "lambda_function.lambda_handler",
  code: new pulumi.asset.AssetArchive({
    ".": new pulumi.asset.FileArchive("./lambda"),
  }),
});
```

**Vantagem**: Você versiona sua infraestrutura no Git, igual ao código.

---

## ✅ Checklist de Implementação

### Fase 1: Scripts e Configuração

- [ ] Criar `scripts/bootstrap.sh`
- [ ] Criar `scripts/control-plane.sh`
- [ ] Criar `scripts/dev-local.sh`
- [ ] Dar permissão de execução (`chmod +x`)
- [ ] Criar `src/frontend/.env.example`
- [ ] Criar `src/backend/.env.example`
- [ ] Criar `infra/.env.example`

### Fase 2: Lambda Functions

- [ ] Criar `src/backend/common/lambda/lambda_function.py`
- [ ] Criar `src/backend/ai/lambda/lambda_function.py`
- [ ] Criar `src/backend/payments/lambda/lambda_function.py`
- [ ] Criar `src/backend/insights/lambda/lambda_function.py`
- [ ] Criar `src/backend/sales/lambda/lambda_function.py`
- [ ] Testar cada Lambda localmente (se possível)

### Fase 3: Infraestrutura

- [ ] Configurar AWS Profile "ultrafitlab"
- [ ] Criar código Pulumi para bootstrap
- [ ] Deploy do bootstrap (`./scripts/bootstrap.sh`)
- [ ] Criar código Pulumi para control-plane
- [ ] Deploy do control-plane (`./scripts/control-plane.sh`)
- [ ] Extrair outputs do Cognito
- [ ] Configurar `.env.local` do frontend

### Fase 4: Testes e Validação

- [ ] Testar frontend localmente
- [ ] Testar integração frontend → API Gateway → Lambda
- [ ] Validar autenticação Cognito
- [ ] Testar webhook do Asaas (se aplicável)

---

## 🔧 Próximos Passos Recomendados

1. **Comece pelos scripts** - São mais simples e úteis imediatamente
2. **Crie as Lambdas básicas** - Mesmo que simples, já estabelece a estrutura
3. **Configure a infraestrutura** - Pode ser a parte mais complexa, peça ajuda se necessário
4. **Teste incrementalmente** - Não tente fazer tudo de uma vez

---

## 🆘 Dúvidas Comuns

### Como testar uma Lambda localmente?

Use ferramentas como:

- **SAM CLI** (AWS Serverless Application Model)
- **serverless-offline** (se usar Serverless Framework)
- **LocalStack** (simula AWS localmente)

### Como fazer deploy de uma Lambda?

1. **Via Pulumi** (recomendado): A infraestrutura já faz o deploy
2. **Manual**: Zip o código e faça upload via AWS CLI
3. **CI/CD**: Automatize no GitHub Actions / GitLab CI

### Onde colocar secrets (API keys, etc.)?

- **Desenvolvimento local**: Arquivo `.env` (não commitar!)
- **Produção**: AWS Secrets Manager ou Parameter Store
- **Nunca**: Commitar no Git

---

**Última atualização**: 2025-01-27  
**Versão**: 1.0.0

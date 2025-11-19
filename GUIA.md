# Ultrafit Lab - Guia de Setup Completo

**Status**: Ativo  
**Criado**: 2025-01-27  
**Projeto**: Ultrafit Lab  
**Baseado em**: WetrackWise Architecture

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Configuração Inicial](#configuração-inicial)
4. [Frontend (Next.js)](#frontend-nextjs)
5. [Backend (Python Lambda)](#backend-python-lambda)
6. [Infraestrutura (Pulumi)](#infraestrutura-pulumi)
7. [Scripts de Automação](#scripts-de-automação)
8. [Ordem de Execução Completa](#ordem-de-execução-completa)
9. [Desenvolvimento Local](#desenvolvimento-local)
10. [Deploy](#deploy)
11. [Checklist Final](#checklist-final)

---

## 🛠 Pré-requisitos

### Ferramentas Necessárias

```bash
# Verificar instalações
node --version    # Node.js 18+ requerido
npm --version
python3 --version # Python 3.13+ requerido
pulumi --version  # Pulumi CLI requerido
aws --version     # AWS CLI requerido
```

### Configuração AWS

```bash
# Configurar AWS Profile
aws configure --profile ultrafitlab

# Ou editar manualmente ~/.aws/credentials:
# [ultrafitlab]
# aws_access_key_id = SEU_ACCESS_KEY
# aws_secret_access_key = SEU_SECRET_KEY
# region = us-east-1
```

### Variáveis de Ambiente

```bash
# Sempre usar este profile para comandos AWS
export AWS_PROFILE="ultrafitlab"
```

---

## 📁 Estrutura do Projeto

### Criar Estrutura de Diretórios

```bash
# Criar estrutura base
mkdir -p ultrafit-lab/{src/{frontend,backend},infra/pulumi/{bootstrap,control-plane},scripts,iam-policies/{policies,roles},docs}

# Navegar para o projeto
cd ultrafit-lab
```

### Estrutura Final Esperada

```
ultrafit-lab/
├── src/
│   ├── frontend/              # Next.js 15 + React 19
│   └── backend/               # Python 3.13 Lambda functions
│       ├── common/            # Código compartilhado
│       └── [domains]/         # Domínios específicos
├── infra/
│   └── pulumi/
│       ├── bootstrap/         # S3 state bucket, IAM, OIDC
│       └── control-plane/     # Frontend, Auth, API Gateway
├── scripts/                   # Scripts de automação
├── iam-policies/              # Políticas IAM centralizadas
│   ├── policies/
│   └── roles/
└── docs/                      # Documentação
```

---

## ⚙️ Configuração Inicial

### 1. Inicializar Git (Opcional)

```bash
git init
git branch -M main
```

### 2. Criar .gitignore

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
venv/
__pycache__/
*.pyc
*.pyo

# Environment
.env
.env.local
.env*.local

# Build outputs
dist/
build/
out/
.next/

# Pulumi
.pulumi/
*.stack.yaml

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
EOF
```

---

## 🎨 Frontend (Next.js)

### 1. Inicializar Next.js

```bash
cd src/frontend

# Inicializar Next.js (se ainda não criado)
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --yes
```

### 2. Instalar Dependências Base

```bash
# Instalar dependências essenciais (baseado no WetrackWise)
npm install \
  next@^15.4.7 \
  react@^19.1.0 \
  react-dom@^19.1.0 \
  typescript@^5 \
  tailwindcss@^4.1.11 \
  @tailwindcss/postcss@^4.1.12 \
  autoprefixer@^10.4.21 \
  postcss@^8.5.6 \
  @tanstack/react-query@^5.90.10 \
  axios@^1.13.2 \
  aws-amplify@^6.15.5 \
  @aws-sdk/client-cognito-identity-provider@^3.879.0 \
  lucide-react@^0.525.0 \
  clsx@^2.1.0 \
  tailwind-merge@^2.2.0
```

### 3. Configurar Variáveis de Ambiente

```bash
# Criar arquivo de exemplo
cat > .env.example << 'EOF'
NEXT_PUBLIC_COGNITO_USER_POOL_ID=
NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID=
NEXT_PUBLIC_COGNITO_DOMAIN=
NEXT_PUBLIC_COGNITO_REGION=us-east-1
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
EOF

# Copiar para local (será preenchido após deploy da infra)
cp .env.example .env.local
```

### 4. Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Acessar: http://localhost:3000
```

---

## 🐍 Backend (Python Lambda)

### 1. Criar Estrutura de Domínios

```bash
cd src/backend

# Criar estrutura base
mkdir -p common/{lambda,requirements.txt}
mkdir -p meu-dominio/{lambda,requirements.txt}
```

### 2. Criar requirements.txt Base

Para uma Lambda básica que acessa AWS:

```bash
cat > common/requirements.txt << 'EOF'
boto3==1.34.0
botocore==1.34.0
EOF
```

Para Lambda com processamento de arquivos:

```bash
cat > meu-dominio/lambda/requirements.txt << 'EOF'
boto3==1.34.0
botocore==1.34.0
openpyxl==3.1.5
EOF
```

Para Lambda com análise de dados:

```bash
cat > meu-dominio/lambda/requirements.txt << 'EOF'
boto3==1.34.0
botocore==1.34.0
duckdb==1.4.0
openpyxl==3.1.5
EOF
```

### 3. Criar Lambda Function Exemplo

```bash
cat > meu-dominio/lambda/lambda_function.py << 'EOF'
import json
import boto3
import logging
from typing import Dict, Any

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# AWS clients
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Handler principal da Lambda
    """
    try:
        logger.info(f"Event received: {json.dumps(event)}")

        # Sua lógica aqui
        response = {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Hello from Ultrafit Lab Lambda!",
                "event": event
            })
        }

        return response

    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return {
            "statusCode": 500,
            "body": json.dumps({
                "error": str(e)
            })
        }
EOF
```

### 4. Ambiente Virtual (Desenvolvimento Local)

```bash
# Criar ambiente virtual
python3 -m venv venv

# Ativar ambiente virtual
source venv/bin/activate  # macOS/Linux
# ou
venv\Scripts\activate     # Windows

# Instalar dependências
pip install -r meu-dominio/lambda/requirements.txt
```

---

## 🏗️ Infraestrutura (Pulumi)

### 1. Bootstrap Infrastructure (Primeiro Passo)

O bootstrap cria o S3 bucket de estado que será usado pelos outros stacks.

```bash
cd infra/pulumi/bootstrap

# Instalar dependências
npm install

# Configurar AWS Profile
export AWS_PROFILE="ultrafitlab"

# Configurar Pulumi (usar backend local inicialmente)
pulumi login --local

# Criar stack
pulumi stack init staging

# Configurar valores
pulumi config set bootstrap:config:accountId "SEU_AWS_ACCOUNT_ID"
pulumi config set bootstrap:config:projectName "ultrafitlab"
pulumi config set bootstrap:config:environment "staging"
pulumi config set bootstrap:config:createOidcProvider true

# Preview das mudanças
pulumi preview

# Deploy (após revisar o preview)
pulumi up
```

**Importante**: Após o deploy do bootstrap, anote o nome do bucket S3 criado (será usado no próximo passo).

### 2. Control Plane Infrastructure

```bash
cd ../control-plane

# Instalar dependências
npm install

# Configurar backend S3 (criado pelo bootstrap)
# Substitua 'ultrafitlab-bootstrap-state-staging' pelo nome real do bucket
pulumi login s3://ultrafitlab-bootstrap-state-staging

# Criar stack
pulumi stack init staging

# Configurar valores necessários
pulumi config set wetrackwise:placement:projectName "ultrafitlab"
pulumi config set wetrackwise:placement:environment "staging"

# Configurar domínio (se aplicável)
pulumi config set wetrackwise:placement:domain "ultrafitlab.com"

# Preview das mudanças
pulumi preview

# Deploy
pulumi up
```

### 3. Extrair Outputs da Infraestrutura

Após o deploy do control-plane, extrair os valores do Cognito:

```bash
# Obter outputs
pulumi stack output cognitoUserPoolId
pulumi stack output cognitoUserPoolClientId
pulumi stack output cognitoUserPoolDomain
pulumi stack output apiGatewayUrl
```

Atualizar `.env.local` do frontend com esses valores.

---

## 🤖 Scripts de Automação

### 1. Script Bootstrap

```bash
cat > scripts/bootstrap.sh << 'EOF'
#!/bin/bash

set -euo pipefail

PROJECT_NAME="ultrafitlab"
AWS_PROFILE="ultrafitlab"

export AWS_PROFILE="$AWS_PROFILE"
cd infra/pulumi/bootstrap

pulumi login s3://ultrafitlab-manual-state-${ENVIRONMENT:-staging}
pulumi stack select ${ENVIRONMENT:-staging} || pulumi stack init ${ENVIRONMENT:-staging}

pulumi up
EOF

chmod +x scripts/bootstrap.sh
```

### 2. Script Control Plane

```bash
cat > scripts/control-plane.sh << 'EOF'
#!/bin/bash

set -euo pipefail

PROJECT_NAME="ultrafitlab"
AWS_PROFILE="ultrafitlab"

export AWS_PROFILE="$AWS_PROFILE"
cd infra/pulumi/control-plane

pulumi login s3://ultrafitlab-bootstrap-state-${ENVIRONMENT:-staging}
pulumi stack select ${ENVIRONMENT:-staging} || pulumi stack init ${ENVIRONMENT:-staging}

pulumi up
EOF

chmod +x scripts/control-plane.sh
```

### 3. Script Desenvolvimento Local

```bash
cat > scripts/dev-local.sh << 'EOF'
#!/bin/bash

set -e

cd src/frontend

# Criar .env.local se não existir
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "⚠️  Configure .env.local com valores do Cognito após deploy da infra"
fi

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    npm install
fi

# Iniciar servidor de desenvolvimento
npm run dev
EOF

chmod +x scripts/dev-local.sh
```

---

## 🚀 Ordem de Execução Completa

### Passo 1: Configurar AWS Profile

```bash
export AWS_PROFILE="ultrafitlab"
aws sts get-caller-identity  # Verificar acesso
```

### Passo 2: Bootstrap Infrastructure

```bash
cd infra/pulumi/bootstrap
npm install
pulumi login --local
pulumi stack init staging

# Configurar valores
pulumi config set bootstrap:config:accountId "SEU_ACCOUNT_ID"
pulumi config set bootstrap:config:projectName "ultrafitlab"
pulumi config set bootstrap:config:environment "staging"
pulumi config set bootstrap:config:createOidcProvider true

# Deploy
pulumi preview
pulumi up
```

### Passo 3: Control Plane Infrastructure

```bash
cd ../control-plane
npm install

# Usar bucket criado pelo bootstrap
pulumi login s3://ultrafitlab-bootstrap-state-staging
pulumi stack init staging

# Configurar valores
pulumi config set wetrackwise:placement:projectName "ultrafitlab"
pulumi config set wetrackwise:placement:environment "staging"

# Deploy
pulumi preview
pulumi up
```

### Passo 4: Configurar Frontend

```bash
cd ../../../src/frontend

# Obter valores do Cognito
cd ../../infra/pulumi/control-plane
USER_POOL_ID=$(pulumi stack output cognitoUserPoolId)
CLIENT_ID=$(pulumi stack output cognitoUserPoolClientId)
DOMAIN=$(pulumi stack output cognitoUserPoolDomain)
API_URL=$(pulumi stack output apiGatewayUrl)

# Atualizar .env.local
cd ../../../src/frontend
cat > .env.local << EOF
NEXT_PUBLIC_COGNITO_USER_POOL_ID=$USER_POOL_ID
NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID=$CLIENT_ID
NEXT_PUBLIC_COGNITO_DOMAIN=$DOMAIN
NEXT_PUBLIC_COGNITO_REGION=us-east-1
NEXT_PUBLIC_API_URL=$API_URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
EOF
```

### Passo 5: Iniciar Desenvolvimento

```bash
cd src/frontend
npm install
npm run dev
```

---

## 💻 Desenvolvimento Local

### Frontend

```bash
cd src/frontend
npm run dev
# Acessar: http://localhost:3000
```

### Backend (Teste Local)

```bash
cd src/backend
python3 -m venv venv
source venv/bin/activate
pip install -r meu-dominio/lambda/requirements.txt

# Testar Lambda localmente (usar ferramentas como SAM ou serverless-offline)
```

### Usando Scripts

```bash
# Desenvolvimento local completo
./scripts/dev-local.sh

# Deploy bootstrap
./scripts/bootstrap.sh

# Deploy control plane
./scripts/control-plane.sh
```

---

## 📦 Deploy

### Deploy Completo (Usando Scripts)

```bash
# 1. Bootstrap
export AWS_PROFILE="ultrafitlab"
./scripts/bootstrap.sh

# 2. Control Plane
./scripts/control-plane.sh

# 3. Frontend (se tiver script de build e deploy)
cd src/frontend
npm run build:staging
# Upload para S3 (geralmente feito pelo Pulumi)
```

### Deploy Manual

```bash
# Bootstrap
cd infra/pulumi/bootstrap
pulumi up

# Control Plane
cd ../control-plane
pulumi up

# Frontend Build
cd ../../../src/frontend
npm run build:staging
```

---

## ✅ Checklist Final

### Pré-requisitos

- [ ] Node.js 18+ instalado
- [ ] Python 3.13+ instalado
- [ ] Pulumi CLI instalado
- [ ] AWS CLI configurado
- [ ] AWS Profile "ultrafitlab" configurado

### Infraestrutura

- [ ] Bootstrap infrastructure deployado
- [ ] S3 bucket de estado criado
- [ ] Control Plane infrastructure deployado
- [ ] Cognito User Pool criado
- [ ] API Gateway configurado

### Frontend

- [ ] Next.js inicializado
- [ ] Dependências instaladas
- [ ] Variáveis de ambiente configuradas (.env.local)
- [ ] Servidor de desenvolvimento funcionando

### Backend

- [ ] Estrutura de diretórios criada
- [ ] requirements.txt configurado
- [ ] Lambda functions criadas
- [ ] Ambiente virtual configurado (para dev local)

### Scripts

- [ ] Scripts de automação criados
- [ ] Permissões de execução configuradas
- [ ] Scripts testados

### Documentação

- [ ] README.md criado
- [ ] Documentação de domínios específicos
- [ ] Guias de desenvolvimento

---

## 🔧 Troubleshooting

### Erro: AWS Profile não encontrado

```bash
# Verificar profiles configurados
aws configure list-profiles

# Configurar profile
aws configure --profile ultrafitlab
```

### Erro: Pulumi stack não encontrado

```bash
# Listar stacks disponíveis
pulumi stack ls

# Criar stack se não existir
pulumi stack init staging
```

### Erro: Bucket S3 não encontrado

```bash
# Verificar se bootstrap foi deployado
cd infra/pulumi/bootstrap
pulumi stack output pulumiStateBucketName

# Usar o nome correto do bucket no login
pulumi login s3://NOME_DO_BUCKET
```

### Erro: Variáveis de ambiente não carregadas

```bash
# Verificar se .env.local existe
ls -la src/frontend/.env.local

# Verificar valores
cat src/frontend/.env.local

# Re-executar extração de outputs
cd infra/pulumi/control-plane
pulumi stack output
```

---

## 📚 Referências

- **WetrackWise Architecture**: Base para este guia
- **Pulumi Documentation**: https://www.pulumi.com/docs/
- **Next.js Documentation**: https://nextjs.org/docs
- **AWS Lambda Python**: https://docs.aws.amazon.com/lambda/latest/dg/lambda-python.html

---

## 🆘 Suporte

Para dúvidas ou problemas:

1. Verificar logs do Pulumi: `pulumi logs`
2. Verificar CloudWatch Logs (AWS Console)
3. Revisar documentação específica do domínio
4. Consultar ADRs do projeto base (WetrackWise)

---

**Última atualização**: 2025-01-27  
**Versão**: 1.0.0

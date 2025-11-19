# Ultrafit Lab

Plataforma de IA para nutrição e treinos de academia, construída com arquitetura serverless na AWS. Substitua nutricionista e personal trainer com inteligência artificial.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Desenvolvimento](#desenvolvimento)
- [Deploy](#deploy)
- [Documentação](#documentação)

## 🎯 Visão Geral

Ultrafit Lab é uma plataforma moderna para conversar com a IA com objetivo em nutrição e treinos de academia, desenvolvida com foco em escalabilidade, performance, segurança, experiência do usuário e saúde. Objetivo é que a IA substitua completamente uma nutricionista e um personal trainer. Dentro da plataforma o usuário poderá organizar sua alimentação de acordo com seu objetivo e poderá organizar sua rotina de treinos.

### Principais Funcionalidades

- **Assistente de Nutrição com IA**: Planejamento alimentar personalizado baseado em objetivos, substituindo nutricionista tradicional
- **Personal Trainer Virtual**: Criação e organização de rotinas de treino personalizadas com IA
- **Conversação Inteligente**: Interface de chat para interagir com a IA sobre nutrição e treinos
- **Gestão de Objetivos**: Organização de alimentação e treinos de acordo com metas do usuário
- **Pagamentos**: Integração com Asaas para assinaturas e pagamentos
- **Insights e Analytics**: Análise de progresso e métricas de saúde

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura serverless baseada em:

- **Frontend**: Next.js 16 com React 19
- **Backend**: AWS Lambda (Python 3.14)
- **Infraestrutura**: Pulumi para IaC
- **CI/CD**: Automatizado com canary/blue-green deployments

### Domínios do Backend

- `common`: Utilitários e código compartilhado
- `ai`: Integração com modelos de IA (OpenAI, Anthropic) para conversação sobre nutrição e treinos
- `insights`: Análise de dados, progresso do usuário e métricas de saúde
- `payments`: Processamento de pagamentos e assinaturas (Asaas)
- `sales`: Gestão de vendas e conversões

## 🛠️ Tecnologias

### Frontend

- **Next.js 16**: Framework React com App Router
- **React 19**: Biblioteca UI
- **TypeScript**: Tipagem estática
- **Tailwind CSS 4**: Estilização
- **Shadcn UI**: Biblioteca de componentes acessíveis e customizáveis
- **Radix UI**: Primitivos acessíveis (base do Shadcn UI)
- **Axios**: Cliente HTTP para chamadas à API
- **React Query**: Gerenciamento de estado servidor e cache
- **React Hook Form**: Formulários performáticos e acessíveis
- **Zod**: Validação de schemas TypeScript-first
- **Zustand**: Gerenciamento de estado global leve e simples
- **Sonner**: Sistema de notificações/toasts elegante
- **next-themes**: Gerenciamento de tema (dark/light mode)
- **date-fns**: Manipulação e formatação de datas
- **Lucide React**: Ícones modernos
- **Biome**: Linter e formatter
- **pnpm**: Gerenciador de pacotes

### Backend

- **Python 3.14**: Linguagem principal
- **AWS Lambda**: Funções serverless
- **boto3**: SDK AWS
- **Pydantic**: Validação de dados
- **Structlog**: Logging estruturado

### Infraestrutura

- **Pulumi**: Infrastructure as Code
- **AWS**: Cloud provider
- **IAM Policies**: Gestão de permissões

## 📁 Estrutura do Projeto

```
ultrafit-lab/
├── docs/                    # Documentação adicional
├── iam-policies/            # Políticas IAM
│   ├── policies/
│   └── roles/
├── infra/                   # Infraestrutura
│   └── pulumi/
│       ├── bootstrap/
│       └── control-plane/
├── scripts/                 # Scripts utilitários
└── src/
    ├── backend/             # Backend (Lambda Functions)
    │   ├── ai/
    │   │   ├── lambda/
    │   │   └── requirements.txt
    │   ├── common/
    │   │   ├── lambda/
    │   │   └── requirements.txt
    │   ├── insights/
    │   │   ├── lambda/
    │   │   └── requirements.txt
    │   ├── payments/
    │   │   ├── lambda/
    │   │   └── requirements.txt
    │   ├── sales/
    │   │   ├── lambda/
    │   │   └── requirements.txt
    │   ├── venv/            # Virtual environment (não commitado)
    │   └── requirements.txt # Dependências consolidadas
    └── frontend/             # Frontend (Next.js)
        ├── app/
        ├── public/
        └── package.json
```

## 📦 Pré-requisitos

- **Node.js** >= 20.x
- **pnpm** >= 9.x (gerenciador de pacotes)
- **Python** >= 3.14
- **AWS CLI** configurado
- **Pulumi CLI** (para deploy de infraestrutura)
- **Git**

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone <repository-url>
cd ultrafit-lab
```

### 2. Instale o pnpm (se ainda não tiver)

```bash
# Via npm
npm install -g pnpm

# Via Homebrew (macOS)
brew install pnpm

# Via curl
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### 3. Instale as dependências do Frontend

```bash
cd src/frontend
pnpm install
```

### 4. Configure o ambiente virtual do Backend

```bash
cd src/backend
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# ou
venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

## ⚙️ Configuração

### Variáveis de Ambiente

Copie os arquivos `.env.example` para `.env` e preencha com suas credenciais:

#### Backend

```bash
cp src/backend/.env.example src/backend/.env
```

Edite `src/backend/.env` com:

- AWS credentials
- OpenAI API key
- Anthropic API key
- Asaas API key e webhook token

#### Frontend

```bash
cp src/frontend/.env.example src/frontend/.env
```

Edite `src/frontend/.env` com:

- API endpoints
- Asaas public key (se necessário para frontend)

#### Infraestrutura

```bash
cp infra/.env.example infra/.env
```

Edite `infra/.env` com:

- AWS credentials
- Pulumi access token

## 💻 Desenvolvimento

### Frontend

```bash
cd src/frontend
pnpm dev
```

Acesse: http://localhost:3000

**Scripts disponíveis:**

- `pnpm dev`: Servidor de desenvolvimento
- `pnpm build`: Build de produção
- `pnpm start`: Servidor de produção
- `pnpm lint`: Executar linter (Biome)
- `pnpm format`: Formatar código

**Tecnologias de API:**

- **Axios**: Cliente HTTP para chamadas à API
- **React Query (@tanstack/react-query)**: Gerenciamento de estado servidor, cache e sincronização de dados

**Componentes UI:**

- **Shadcn UI**: Componentes acessíveis e customizáveis
- Use `pnpm dlx shadcn@latest add [component]` para adicionar componentes
- Componentes ficam em `components/ui/` e podem ser editados livremente

**Formulários e Validação:**

- **React Hook Form**: Formulários performáticos com validação
- **Zod**: Schemas de validação TypeScript-first
- **@hookform/resolvers**: Integração Zod + React Hook Form
- Exemplo: Validação de formulários de nutrição e treinos

**Gerenciamento de Estado:**

- **Zustand**: Estado global leve (substitui Redux em muitos casos)
- **React Query**: Estado servidor, cache e sincronização
- Use Zustand para estado do cliente, React Query para dados do servidor

**UX e Notificações:**

- **Sonner**: Toasts elegantes e acessíveis
- **next-themes**: Dark mode com persistência
- Integração nativa com Shadcn UI

**Utilitários:**

- **date-fns**: Manipulação de datas (formatação, cálculos, timezones)
- Útil para agendamentos, histórico de treinos, etc.

### Backend

```bash
cd src/backend
source venv/bin/activate

# Executar testes (quando implementados)
pytest

# Executar linter (quando configurado)
ruff check .
```

### Estrutura de Lambda

Cada módulo possui sua própria Lambda com:

- `lambda/`: Código da função
- `requirements.txt`: Dependências específicas

## 🚢 Deploy

### Infraestrutura (Pulumi)

```bash
cd infra/pulumi/control-plane
pulumi up
```

### Backend (Lambda)

As Lambdas são deployadas automaticamente via CI/CD ou manualmente:

```bash
# Exemplo para cada módulo
cd src/backend/payments
zip -r function.zip lambda/ requirements.txt
aws lambda update-function-code --function-name payments-function --zip-file fileb://function.zip
```

### Frontend

```bash
cd src/frontend
pnpm build
# Deploy via Vercel, AWS Amplify, ou outro provider
```

## 📚 Documentação

- [Documentação do Frontend](./src/frontend/README.md)
- [Guia de Bibliotecas Frontend](./src/frontend/README-LIBS.md) - Exemplos práticos de uso
- [Shadcn UI - Guia Rápido](./src/frontend/README-SHADCN.md) - Componentes UI
- [Documentação de Infraestrutura](./infra/README.md) (quando disponível)
- [Políticas IAM](./iam-policies/README.md) (quando disponível)

## 🔒 Segurança

- **Nunca commite** arquivos `.env` com credenciais reais
- Use **AWS Secrets Manager** ou **Parameter Store** para secrets em produção
- Siga as **políticas IAM** definidas em `iam-policies/`
- Valide e sanitize todos os inputs
- Use HTTPS em produção

## 🧪 Testes

```bash
# Frontend (quando implementado)
cd src/frontend
pnpm test

# Backend (quando implementado)
cd src/backend
source venv/bin/activate
pytest
```

## 📝 Convenções

### Código

- **Python**: Seguir PEP 8, usar type hints
- **TypeScript**: Strict mode habilitado
- **Commits**: Conventional Commits
- **PRs**: Pequenas, com descrição clara

### Observability

- **Logs**: Estruturados com `structlog`
- **Métricas**: P50/P95/P99 para endpoints críticos
- **Tracing**: Para serviços distribuídos

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
2. Faça commit: `git commit -m 'feat: adiciona nova funcionalidade'`
3. Push: `git push origin feature/nova-funcionalidade`
4. Abra um Pull Request

### Checklist de PR

- [ ] Código segue as convenções do projeto
- [ ] Testes passando
- [ ] Linter passando
- [ ] Documentação atualizada
- [ ] Changelog atualizado (se aplicável)

## 📄 Licença

[Adicione a licença do projeto aqui]

## 👥 Equipe

[Adicione informações da equipe aqui]

## 🔗 Links Úteis

### Frontend

- [Next.js Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [Sonner](https://sonner.emilkowal.ski/)
- [date-fns](https://date-fns.org/)

### Backend

- [AWS Lambda Docs](https://docs.aws.amazon.com/lambda/)
- [Python 3.14](https://docs.python.org/3.14/)
- [Pydantic](https://docs.pydantic.dev/)
- [Structlog](https://www.structlog.org/)

### Infraestrutura

- [Pulumi Docs](https://www.pulumi.com/docs/)
- [AWS Docs](https://docs.aws.amazon.com/)
- [Documentação Asaas](https://docs.asaas.com/)

### APIs

- [OpenAI API](https://platform.openai.com/docs)
- [Anthropic API](https://docs.anthropic.com/)

---

**Última atualização**: Novembro 2024

#!/bin/bash

# Script de setup para ambiente de desenvolvimento
# Ultrafit Lab

set -e

echo "🚀 Configurando ambiente de desenvolvimento do Ultrafit Lab..."
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para printar com cor
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Verificar se está na raiz do projeto
if [ ! -f "package.json" ] && [ ! -d "src" ]; then
    print_error "Execute este script da raiz do projeto!"
    exit 1
fi

# 1. Verificar Node.js
print_status "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js não encontrado! Instale Node.js 20+ primeiro."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_error "Node.js 20+ é necessário. Versão atual: $(node -v)"
    exit 1
fi
print_success "Node.js $(node -v) encontrado"

# 2. Verificar npm
print_status "Verificando npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm não encontrado!"
    exit 1
fi
print_success "npm $(npm -v) encontrado"

# 3. Setup Frontend
print_status "Configurando frontend..."
cd src/frontend

if [ ! -f ".env.local" ]; then
    print_warning ".env.local não encontrado, criando a partir do .env.example..."
    cp .env.example .env.local
    print_warning "⚠️  IMPORTANTE: Configure as variáveis em src/frontend/.env.local"
fi

if [ ! -d "node_modules" ]; then
    print_status "Instalando dependências do frontend..."
    npm install
    print_success "Dependências do frontend instaladas"
else
    print_success "Dependências do frontend já instaladas"
fi

cd ../..

# 4. Setup Backend
print_status "Configurando backend..."
cd src/backend

if [ ! -f ".env" ]; then
    print_warning ".env não encontrado, criando a partir do .env.example..."
    cp .env.example .env
    print_warning "⚠️  IMPORTANTE: Configure as variáveis em src/backend/.env"
fi

# Instalar dependências principais do backend
if [ ! -d "node_modules" ]; then
    print_status "Instalando dependências principais do backend..."
    npm install
    print_success "Dependências principais instaladas"
else
    print_success "Dependências principais já instaladas"
fi

# Instalar dependências de cada módulo
for module in common ai payments insights sales; do
    if [ -d "$module" ]; then
        print_status "Instalando dependências do módulo $module..."
        cd $module
        if [ ! -d "node_modules" ]; then
            npm install
            print_success "Dependências do $module instaladas"
        else
            print_success "Dependências do $module já instaladas"
        fi
        cd ..
    fi
done

cd ../..

# 5. Verificar AWS CLI (opcional)
print_status "Verificando AWS CLI..."
if command -v aws &> /dev/null; then
    print_success "AWS CLI $(aws --version | cut -d' ' -f1) encontrado"
else
    print_warning "AWS CLI não encontrado (opcional para desenvolvimento local)"
fi

# 6. Verificar Python (para backend Python se necessário)
print_status "Verificando Python..."
if command -v python3 &> /dev/null; then
    print_success "Python $(python3 --version) encontrado"
else
    print_warning "Python não encontrado (necessário para alguns scripts)"
fi

# 7. Criar diretórios necessários
print_status "Criando diretórios necessários..."
mkdir -p logs
mkdir -p .temp
print_success "Diretórios criados"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Setup concluído com sucesso!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1. Configure as variáveis de ambiente:"
echo "   - src/frontend/.env.local (Cognito, API URL)"
echo "   - src/backend/.env (AWS, OpenAI, Asaas)"
echo ""
echo "2. Configure AWS Cognito:"
echo "   - Crie User Pool no AWS Console"
echo "   - Copie credenciais para .env.local"
echo ""
echo "3. Inicie o frontend:"
echo "   cd src/frontend"
echo "   npm run dev"
echo ""
echo "4. Para desenvolvimento do backend:"
echo "   cd src/backend"
echo "   npm run build"
echo ""
echo "5. Consulte a documentação:"
echo "   - TESTING_CHECKLIST.md"
echo "   - BACKEND_IMPLEMENTATION_GUIDE.md"
echo "   - SECURITY_IMPROVEMENTS_APPLIED.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

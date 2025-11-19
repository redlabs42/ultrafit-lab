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

#!/bin/bash

# Script para ajudar na migração de cores hardcoded para o novo sistema de tema
# Execute com: bash scripts/migrate-colors.sh

echo "🎨 Iniciando migração de cores..."
echo ""

# Cores de texto - erros
echo "📝 Substituindo cores de erro em texto..."
find components -type f -name "*.tsx" -exec sed -i '' 's/text-red-500/text-destructive/g' {} +
find components -type f -name "*.tsx" -exec sed -i '' 's/text-red-600/text-destructive/g' {} +

# Cores de texto - sucesso
echo "✅ Substituindo cores de sucesso em texto..."
find components -type f -name "*.tsx" -exec sed -i '' 's/text-green-600/text-success/g' {} +
find components -type f -name "*.tsx" -exec sed -i '' 's/text-green-800/text-success/g' {} +

# Cores de texto - aviso
echo "⚠️  Substituindo cores de aviso em texto..."
find components -type f -name "*.tsx" -exec sed -i '' 's/text-yellow-800/text-warning/g' {} +

# Badges - sucesso
echo "🏷️  Substituindo badges de sucesso..."
find components -type f -name "*.tsx" -exec sed -i '' 's/bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200/bg-success\/10 text-success border-success\/20/g' {} +

# Badges - aviso
echo "🏷️  Substituindo badges de aviso..."
find components -type f -name "*.tsx" -exec sed -i '' 's/bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200/bg-warning\/10 text-warning border-warning\/20/g' {} +

# Badges - erro
echo "🏷️  Substituindo badges de erro..."
find components -type f -name "*.tsx" -exec sed -i '' 's/bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200/bg-destructive\/10 text-destructive border-destructive\/20/g' {} +

# Backgrounds - aviso
echo "🎨 Substituindo backgrounds de aviso..."
find components -type f -name "*.tsx" -exec sed -i '' 's/bg-yellow-50 dark:bg-yellow-950/bg-warning\/10/g' {} +
find components -type f -name "*.tsx" -exec sed -i '' 's/text-yellow-800 dark:text-yellow-200/text-warning/g' {} +

# Borders - erro
echo "🔲 Substituindo borders de erro..."
find components -type f -name "*.tsx" -exec sed -i '' 's/border-red-200 dark:border-red-900/border-destructive\/20/g' {} +
find components -type f -name "*.tsx" -exec sed -i '' 's/text-red-600 dark:text-red-400/text-destructive/g' {} +

echo ""
echo "✨ Migração concluída!"
echo ""
echo "⚠️  IMPORTANTE: Revise as mudanças antes de fazer commit!"
echo "Execute: git diff para ver todas as alterações"

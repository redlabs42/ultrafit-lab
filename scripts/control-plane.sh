#!/bin/bash
set -euo pipefail

PROJECT_NAME="ultrafitlab"
AWS_PROFILE="ultrafitlab"
ENVIRONMENT="${ENVIRONMENT:-staging}"

export AWS_PROFILE="$AWS_PROFILE"
# Check if directory exists before cd
if [ ! -d "infra/pulumi/control-plane" ]; then
    echo "❌ Directory infra/pulumi/control-plane not found!"
    exit 1
fi
cd infra/pulumi/control-plane

# Login no Pulumi S3 (bucket criado pelo bootstrap)
pulumi login s3://pulumi-state-f6773db

# Selecionar ou criar stack
pulumi stack select "$ENVIRONMENT" || pulumi stack init "$ENVIRONMENT"

# Configurar variáveis obrigatórias
pulumi config set projectName "$PROJECT_NAME"
pulumi config set environment "$ENVIRONMENT"

# Deploy
pulumi up

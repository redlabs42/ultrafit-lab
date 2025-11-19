#!/bin/bash
set -euo pipefail

PROJECT_NAME="ultrafitlab"
AWS_PROFILE="ultrafitlab"
ENVIRONMENT="${ENVIRONMENT:-staging}"

export AWS_PROFILE="$AWS_PROFILE"
# Check if directory exists before cd
if [ ! -d "infra/pulumi/bootstrap" ]; then
    echo "❌ Directory infra/pulumi/bootstrap not found!"
    exit 1
fi
cd infra/pulumi/bootstrap

# Login no Pulumi (usar local inicialmente, depois S3)
pulumi login --local

# Selecionar ou criar stack
pulumi stack select "$ENVIRONMENT" || pulumi stack init "$ENVIRONMENT"

# Deploy
pulumi up

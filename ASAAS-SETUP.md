# Guia de Configuração do Asaas Sandbox

Este guia vai te ajudar a criar uma conta no ambiente de testes do Asaas (Sandbox) e obter as chaves de acesso necessárias para o Ultrafit Lab.

## 1. Criar Conta no Sandbox

O ambiente Sandbox é totalmente separado do ambiente de produção. Nada feito aqui movimenta dinheiro real.

1.  Acesse: **[https://sandbox.asaas.com/](https://sandbox.asaas.com/)**
2.  Clique em **"Criar conta grátis"**.
3.  Preencha com dados fictícios ou reais (não importa muito, pois é teste).
    - **Dica**: Use um e-mail que você tem acesso para confirmar a conta.
4.  Siga os passos de cadastro até entrar no Painel (Dashboard).

## 2. Gerar API Key

1.  No menu lateral esquerdo, vá em **Configurações** (ícone de engrenagem) ou clique no seu nome no topo direito e vá em **Integrações**.
2.  Procure pela aba **"Chave de API"**.
3.  Clique em **"Gerar chave de API"**.
4.  Copie a chave gerada (ela começa geralmente com `$aact_...`).
    - ⚠️ **Guarde essa chave!** Você não conseguirá vê-la novamente completa.

## 3. Configurar Webhook (Opcional por enquanto)

Para receber notificações de pagamento (que implementamos no código), você precisará configurar uma URL de Webhook.

1.  Na mesma tela de Integrações, procure a aba **"Webhooks"**.
2.  Para Cobranças, clique em **"Configurar"**.
3.  **URL**: Aqui você colocará a URL da sua Lambda de Pagamentos.
    - _Como ainda estamos rodando local ou em dev, deixaremos isso para depois._
4.  **Email para alerta de erros**: Seu e-mail.
5.  **Token de Autenticação**: Crie uma senha/token aleatório (ex: `ultrafit-secret-token-123`).
    - Copie esse token.

## 4. Atualizar o Projeto

Agora, pegue a **API Key** e o **Token do Webhook** e atualize seu arquivo `.env` do backend.

Arquivo: `src/backend/.env`

```env
# Payment Provider (Asaas)
ASAAS_API_KEY=cole_sua_chave_aqui_comecando_com_$aact
ASAAS_WEBHOOK_TOKEN=cole_seu_token_criado_no_passo_3
ASAAS_BASE_URL=https://sandbox.asaas.com/api/v3
```

> **Nota Importante**: Certifique-se de que a `ASAAS_BASE_URL` está apontando para o **sandbox** (`https://sandbox.asaas.com/api/v3`) e não para produção (`https://api.asaas.com/v3`).

# Guia de Criação e Configuração de Conta AWS

Este guia passo a passo vai te ajudar a criar uma conta na AWS do zero e configurá-la para uso seguro no projeto Ultrafit Lab.

## Parte 1: Criar a Conta AWS

1.  Acesse [https://aws.amazon.com/pt/](https://aws.amazon.com/pt/) e clique em **"Crie uma conta da AWS"**.
2.  **E-mail e Nome da Conta**:
    *   Use seu e-mail principal.
    *   Escolha um nome para a conta (ex: `UltrafitLab-Admin`).
3.  **Verificação de E-mail**: Insira o código enviado para o seu e-mail.
4.  **Senha**: Crie uma senha forte (use um gerenciador de senhas se possível).
5.  **Informações de Contato**:
    *   Escolha **"Pessoal"** (a menos que tenha empresa).
    *   Preencha seus dados (Endereço, Telefone).
6.  **Informações de Pagamento**:
    *   Insira um cartão de crédito válido (é obrigatório, mesmo para o nível gratuito).
    *   A AWS fará uma cobrança temporária de $1 USD para verificar o cartão.
7.  **Verificação de Identidade**:
    *   Escolha SMS ou Chamada de voz para receber um código de verificação no seu celular.
8.  **Plano de Suporte**:
    *   Escolha **"Basic Support - Free"** (Suporte Básico - Gratuito).
9.  **Finalizar**: Aguarde alguns minutos até receber o e-mail de confirmação de ativação da conta.

---

## Parte 2: Proteger o Usuário Raiz (Root)

O usuário que você acabou de criar é o "Root User". Ele tem poder total e deve ser protegido.

1.  Faça login no Console AWS como **Root user** (usando seu e-mail).
2.  No canto superior direito, clique no nome da sua conta e selecione **"Credenciais de segurança"** (Security credentials).
3.  Procure por **"Autenticação multifator (MFA)"**.
4.  Clique em **"Ativar MFA"**.
5.  Escolha um nome (ex: `Root-MFA`) e selecione **"Aplicativo autenticador"**.
6.  Use um app como **Google Authenticator** ou **Authy** no seu celular para escanear o QR Code.
7.  Digite dois códigos sequenciais gerados pelo app para confirmar.

> ⚠️ **IMPORTANTE**: Nunca use o usuário Root para tarefas do dia a dia. Use-o apenas para criar o primeiro usuário administrador e para tarefas de faturamento.

---

## Parte 3: Criar um Usuário Administrador (IAM User)

Vamos criar o usuário que você usará no terminal e no dia a dia.

1.  Na barra de busca do console (topo), digite **"IAM"** e clique no serviço.
2.  No menu lateral esquerdo, clique em **"Usuários"** (Users).
3.  Clique em **"Criar usuário"**.
4.  **Detalhes do usuário**:
    *   Nome de usuário: `leonardo-admin` (ou outro de sua preferência).
    *   Marque a opção **"Fornecer acesso ao Console de Gerenciamento da AWS"** se quiser logar no painel com este usuário.
    *   Se marcar, escolha "Quero criar um usuário do IAM".
5.  **Permissões**:
    *   Selecione **"Anexar políticas diretamente"**.
    *   Na busca, digite `AdministratorAccess`.
    *   Marque a caixa ao lado de **AdministratorAccess**.
6.  **Revisar e criar**: Clique em "Próximo" e depois em "Criar usuário".
7.  **Credenciais de Acesso (IMPORTANTE)**:
    *   Após criar, vá para a aba **"Credenciais de segurança"** do usuário criado.
    *   Role até **"Chaves de acesso"** e clique em **"Criar chave de acesso"**.
    *   Escolha **"Interface de Linha de Comando (CLI)"**.
    *   Marque a caixa de confirmação e clique em "Próximo".
    *   Clique em **"Criar chave de acesso"**.
    *   **COPIE E SALVE** a `Access key` e a `Secret access key`.
    *   ⚠️ **Você não verá a Secret key novamente.** Se perder, terá que criar uma nova.

---

## Parte 4: Configurar o Terminal (AWS CLI)

Agora vamos configurar seu computador para usar essas credenciais.

1.  Abra seu terminal.
2.  Execute o comando:

```bash
aws configure --profile ultrafitlab
```

3.  Preencha com os dados que você salvou:

```text
AWS Access Key ID [None]: <COLE SUA ACCESS KEY AQUI>
AWS Secret Access Key [None]: <COLE SUA SECRET KEY AQUI>
Default region name [None]: us-east-1
Default output format [None]: json
```

4.  Para testar se funcionou, execute:

```bash
export AWS_PROFILE=ultrafitlab
aws sts get-caller-identity
```

Se aparecer um JSON com seu `UserId` e `Arn`, parabéns! Você está pronto para rodar os scripts do projeto. 🚀

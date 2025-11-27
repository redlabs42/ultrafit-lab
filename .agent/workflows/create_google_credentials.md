---
description: How to create Google OAuth Client ID and Client Secret
---

# Create Google OAuth Credentials

Follow these steps to obtain your Google Client ID and Client Secret for Cognito integration.

1.  **Go to Google Cloud Console**:

    - Navigate to [https://console.cloud.google.com/](https://console.cloud.google.com/).

2.  **Create a Project** (if you haven't already):

    - Click the project dropdown at the top left.
    - Click **"New Project"**.
    - Name it (e.g., "Ultrafit Lab Auth") and click **"Create"**.

3.  **Configure OAuth Consent Screen**:

    - In the left sidebar, go to **APIs & Services** > **OAuth consent screen**.
    - Select **External** (unless you are a Google Workspace user testing internally) and click **Create**.
    - **App Information**: Fill in App Name ("Ultrafit Lab"), User Support Email.
    - **Developer Contact Information**: Fill in your email.
    - Click **Save and Continue** through the steps (Scopes, Test Users).
    - _Note: For testing, you might need to add your own email as a Test User._

4.  **Create Credentials**:

    - Go to **APIs & Services** > **Credentials**.
    - Click **+ CREATE CREDENTIALS** at the top.
    - Select **OAuth client ID**.
    - **Application type**: Select **Web application**.
    - **Name**: e.g., "Cognito Client".
    - **Authorized JavaScript origins**:
      - Add your Cognito Domain URL (e.g., `https://ultrafitlab-staging-staging.auth.us-east-1.amazoncognito.com`).
    - **Authorized redirect URIs**:
      - Add your Cognito Domain URL with `/oauth2/idpresponse` appended.
      - Example: `https://ultrafitlab-staging-staging.auth.us-east-1.amazoncognito.com/oauth2/idpresponse`
    - Click **Create**.

5.  **Copy Credentials**:

    - You will see a modal with **Your Client ID** and **Your Client Secret**.
    - Copy these values.

6.  **Configure AWS Cognito**:

    - Go to AWS Console > Cognito > User Pools > [Your Pool] > Sign-in experience > Identity providers.
    - Select **Google**.
    - Paste the **Client ID** and **Client Secret**.
    - Set **Authorized scopes** to `profile email openid`.
    - Map attributes: `email` -> `email`.

7.  **Update Environment Variables** (if needed):
    - Usually, these secrets stay in AWS Cognito. You don't need to put them in your frontend `.env` file. The frontend only needs the Cognito configuration.

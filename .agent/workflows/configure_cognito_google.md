---
description: How to configure AWS Cognito for Google Login
---

# Configure AWS Cognito for Google Login

Follow these steps to configure your User Pool to accept Google Login and redirect to your local development environment.

1.  **Access User Pool**:

    - Go to the [AWS Console](https://console.aws.amazon.com/cognito/home).
    - Select **User Pools**.
    - Click on your User Pool (e.g., `ultrafit-lab-staging`).

2.  **Add Identity Provider (Google)**:

    - Go to the **Sign-in experience** tab.
    - Scroll to **Federated identity provider sign-in**.
    - Click **Add identity provider**.
    - Select **Google**.
    - **Client ID**: Paste the Client ID from Google Cloud Console.
    - **Client Secret**: Paste the Client Secret from Google Cloud Console.
    - **Authorized scopes**: `profile email openid`.
    - **Map attributes**:
      - `email` -> `email`
      - `email_verified` -> `email_verified`
      - `name` -> `name`
      - `picture` -> `picture` (optional)
      - `username` -> `sub` (Google ID)
    - Click **Add identity provider**.

3.  **Configure App Client**:

    - Go to the **App integration** tab.
    - Scroll to **App client list**.
    - Click on your App Client (e.g., `ultrafit-lab-client`).
    - Scroll to **Hosted UI**.
    - Click **Edit**.

4.  **Update Hosted UI Settings**:

    - **Allowed callback URLs**:
      - Add `http://localhost:3005/auth/callback`.
      - _Tip: You can add multiple URLs by separating them with commas if you have a production URL too._
    - **Allowed sign-out URLs**:
      - Add `http://localhost:3005`.
    - **Identity providers**:
      - Select **Google** (it should appear now).
      - Select **Cognito user pool** (optional, for email/password login).
    - **OAuth 2.0 grant types**:
      - Select **Authorization code grant**.
    - **OpenID Connect scopes**:
      - Select `email`, `openid`, `profile`.
    - Click **Save changes**.

5.  **Get Domain Name**:
    - Still in the **App integration** tab.
    - Look for **Domain name**.
    - Copy the full domain URL (e.g., `https://ultrafitlab-staging-staging.auth.us-east-1.amazoncognito.com`).
    - **Update your `.env.local`** file with this value for `NEXT_PUBLIC_COGNITO_DOMAIN`.

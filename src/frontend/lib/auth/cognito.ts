import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  type CognitoUserSession,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
  ClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
};

let userPool: CognitoUserPool | null = null;

const getUserPool = (): CognitoUserPool => {
  if (!userPool) {
    if (!poolData.UserPoolId || !poolData.ClientId) {
      throw new Error("Cognito configuration is missing. Please set NEXT_PUBLIC_COGNITO_USER_POOL_ID and NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID environment variables.");
    }
    userPool = new CognitoUserPool(poolData);
  }
  return userPool;
};

export interface SignUpParams {
  email: string;
  password: string;
  name: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface ConfirmSignUpParams {
  email: string;
  code: string;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface ResetPasswordParams {
  email: string;
  code: string;
  newPassword: string;
}

// Sign Up
export const signUp = (params: SignUpParams): Promise<CognitoUser> => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: params.email,
      }),
      new CognitoUserAttribute({
        Name: "name",
        Value: params.name,
      }),
    ];

    getUserPool().signUp(
      params.email,
      params.password,
      attributeList,
      [],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        if (result?.user) {
          resolve(result.user);
        }
      },
    );
  });
};

// Confirm Sign Up
export const confirmSignUp = (params: ConfirmSignUpParams): Promise<void> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: params.email,
      Pool: getUserPool(),
    });

    cognitoUser.confirmRegistration(params.code, true, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

// Sign In
export const signIn = (params: SignInParams): Promise<CognitoUserSession> => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: params.email,
      Password: params.password,
    });

    const cognitoUser = new CognitoUser({
      Username: params.email,
      Pool: getUserPool(),
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        resolve(session);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

// Sign Out
export const signOut = (): void => {
  const cognitoUser = getUserPool().getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
};

// Get Current User
export const getCurrentUser = (): CognitoUser | null => {
  return getUserPool().getCurrentUser();
};

// Get Current Session
export const getCurrentSession = (): Promise<CognitoUserSession> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCurrentUser();

    if (!cognitoUser) {
      reject(new Error("No user found"));
      return;
    }

    cognitoUser.getSession(
      (err: Error | null, session: CognitoUserSession | null) => {
        if (err) {
          reject(err);
          return;
        }
        if (session) {
          resolve(session);
        }
      },
    );
  });
};

// Forgot Password
export const forgotPassword = (params: ForgotPasswordParams): Promise<void> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: params.email,
      Pool: getUserPool(),
    });

    cognitoUser.forgotPassword({
      onSuccess: () => {
        resolve();
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

// Reset Password
export const resetPassword = (params: ResetPasswordParams): Promise<void> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: params.email,
      Pool: getUserPool(),
    });

    cognitoUser.confirmPassword(params.code, params.newPassword, {
      onSuccess: () => {
        resolve();
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

// Refresh Session
export const refreshSession = (): Promise<CognitoUserSession> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCurrentUser();

    if (!cognitoUser) {
      reject(new Error("No user found"));
      return;
    }

    cognitoUser.getSession(
      (err: Error | null, session: CognitoUserSession | null) => {
        if (err) {
          reject(err);
          return;
        }

        if (!session) {
          reject(new Error("No session found"));
          return;
        }

        const refreshToken = session.getRefreshToken();

        cognitoUser.refreshSession(refreshToken, (refreshErr, newSession) => {
          if (refreshErr) {
            reject(refreshErr);
            return;
          }
          resolve(newSession);
        });
      },
    );
  });
};

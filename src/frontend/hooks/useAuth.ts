"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as cognito from "@/lib/auth/cognito";
import { useAuthStore } from "@/store";
import type { AuthUser, User } from "@/types";

export function useAuth() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    setAuth,
    logout: logoutStore,
    setLoading,
  } = useAuthStore();

  // Sign Up Mutation
  const signUpMutation = useMutation({
    mutationFn: async (params: cognito.SignUpParams) => {
      return await cognito.signUp(params);
    },
    onSuccess: () => {
      toast.success("Conta criada! Verifique seu email para confirmar.");
      router.push("/auth/confirm");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao criar conta");
    },
  });

  // Confirm Sign Up Mutation
  const confirmSignUpMutation = useMutation({
    mutationFn: async (params: cognito.ConfirmSignUpParams) => {
      return await cognito.confirmSignUp(params);
    },
    onSuccess: () => {
      toast.success("Email confirmado! Faça login para continuar.");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao confirmar email");
    },
  });

  // Sign In Mutation
  const signInMutation = useMutation({
    mutationFn: async (params: cognito.SignInParams) => {
      const session = await cognito.signIn(params);

      // Get tokens from session
      const accessToken = session.getAccessToken().getJwtToken();
      const refreshToken = session.getRefreshToken().getToken();
      const idToken = session.getIdToken();

      // Extract user info from ID token
      const payload = idToken.payload;

      const user: User = {
        id: payload.sub,
        email: payload.email,
        name: payload.name || payload.email,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const authUser: AuthUser = {
        user,
        accessToken,
        refreshToken,
        expiresAt: idToken.getExpiration(),
      };

      return authUser;
    },
    onSuccess: (authUser) => {
      setAuth(authUser);
      toast.success("Login realizado com sucesso!");
      // Use replace instead of push to prevent going back to login page
      router.replace("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao fazer login");
    },
  });

  // Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      cognito.signOut();
    },
    onSuccess: () => {
      logoutStore();
      toast.success("Logout realizado com sucesso!");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao fazer logout");
    },
  });

  // Forgot Password Mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: async (params: cognito.ForgotPasswordParams) => {
      return await cognito.forgotPassword(params);
    },
    onSuccess: () => {
      toast.success("Código de recuperação enviado para seu email!");
      router.push("/auth/reset-password");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao solicitar recuperação");
    },
  });

  // Reset Password Mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async (params: cognito.ResetPasswordParams) => {
      return await cognito.resetPassword(params);
    },
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao alterar senha");
    },
  });

  // Check Session on Mount
  const { isLoading: isCheckingSession } = useQuery({
    queryKey: ["auth-session"],
    queryFn: async () => {
      try {
        const session = await cognito.getCurrentSession();

        if (session.isValid()) {
          const accessToken = session.getAccessToken().getJwtToken();
          const refreshToken = session.getRefreshToken().getToken();
          const idToken = session.getIdToken();
          const payload = idToken.payload;
          const expiresAt = idToken.getExpiration();
          const now = Math.floor(Date.now() / 1000);

          // Check if token is about to expire (within 5 minutes)
          if (expiresAt - now < 300) {
            try {
              const newSession = await cognito.refreshSession();
              const newAccessToken = newSession.getAccessToken().getJwtToken();
              const newRefreshToken = newSession.getRefreshToken().getToken();
              const newIdToken = newSession.getIdToken();
              const newPayload = newIdToken.payload;

              const user: User = {
                id: newPayload.sub,
                email: newPayload.email,
                name: newPayload.name || newPayload.email,
                role: "user",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };

              const authUser: AuthUser = {
                user,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                expiresAt: newIdToken.getExpiration(),
              };

              setAuth(authUser);
              return newSession;
            } catch (_refreshError) {
              // If refresh fails, logout
              setLoading(false);
              logoutStore();
              return null;
            }
          }

          const user: User = {
            id: payload.sub,
            email: payload.email,
            name: payload.name || payload.email,
            role: "user",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          const authUser: AuthUser = {
            user,
            accessToken,
            refreshToken,
            expiresAt,
          };

          setAuth(authUser);
          return session;
        }

        setLoading(false);
        logoutStore();
        return null;
      } catch (_error) {
        setLoading(false);
        logoutStore();
        return null;
      }
    },
    enabled: !isAuthenticated,
    retry: false,
    staleTime: 0,
  });

  return {
    user,
    isAuthenticated,
    isLoading: isCheckingSession || signInMutation.isPending,
    signUp: signUpMutation.mutate,
    confirmSignUp: confirmSignUpMutation.mutate,
    signIn: signInMutation.mutate,
    logout: logoutMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    isSigningUp: signUpMutation.isPending,
    isConfirming: confirmSignUpMutation.isPending,
    isSigningIn: signInMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}

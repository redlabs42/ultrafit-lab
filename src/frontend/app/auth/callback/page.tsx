"use client";

import { exchangeCodeForTokens } from "@/lib/auth/cognito";
import { useAuthStore } from "@/store";
import type { AuthUser, User } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth, setLoading } = useAuthStore();
  const processedRef = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (processedRef.current) return;

    if (error) {
      processedRef.current = true;
      toast.error("Erro na autenticação com Google");
      router.replace("/login");
      return;
    }

    if (!code) {
      processedRef.current = true;
      router.replace("/login");
      return;
    }

    const handleCallback = async () => {
      try {
        processedRef.current = true;
        setLoading(true);

        const session = await exchangeCodeForTokens(code);

        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();
        const idToken = session.getIdToken();
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

        setAuth(authUser);
        toast.success("Login realizado com sucesso!");
        router.replace("/dashboard");
      } catch (err) {
        console.error("Auth callback error:", err);
        toast.error("Falha ao processar login com Google");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router, setAuth, setLoading]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Autenticando...</h2>
        <p className="text-muted-foreground">Por favor, aguarde.</p>
      </div>
    </div>
  );
}

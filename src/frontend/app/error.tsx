"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("Application error:", error);

    // In production, send to monitoring service (Sentry, DataDog, etc)
    if (process.env.NODE_ENV === "production") {
      // TODO: Send to monitoring service
      // Example: Sentry.captureException(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Algo deu errado!</CardTitle>
          <CardDescription>
            Ocorreu um erro inesperado. Por favor, tente novamente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-950 rounded-md">
              <p className="text-sm font-mono text-red-600 dark:text-red-400">
                {error.message}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={reset} className="flex-1">
            Tentar novamente
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = "/";
            }}
            className="flex-1"
          >
            Voltar ao início
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

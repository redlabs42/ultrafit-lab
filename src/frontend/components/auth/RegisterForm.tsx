"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { sanitize } from "@/lib/sanitize";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { signUp, isSigningUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    // Sanitize inputs (except password)
    signUp({
      name: sanitize.name(data.name),
      email: sanitize.email(data.email),
      password: data.password, // Never sanitize passwords
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold mb-2">
          Comece sua jornada
        </CardTitle>
        <CardDescription className="text-base">
          Crie sua conta para começar sua transformação fitness
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nome
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmar Senha
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Digite a senha novamente"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full hover-scale"
            disabled={isSigningUp}
            size="lg"
          >
            {isSigningUp ? "Criando conta..." : "Criar conta"}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-semibold"
            >
              Entrar
            </Link>
          </p>
        </CardFooter>
      </form>

      <div className="px-6 pb-6">
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou continue com
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            // Import dynamically to avoid SSR issues if needed, or just call directly
            import("@/lib/auth/cognito").then((mod) => {
              mod.federatedSignIn("Google");
            });
          }}
          type="button"
        >
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg>
          Google
        </Button>
      </div>
    </Card>
  );
}

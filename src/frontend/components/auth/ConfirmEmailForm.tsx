"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

const confirmSchema = z.object({
  email: z.string().email("Email inválido"),
  code: z.string().min(6, "Código deve ter 6 dígitos"),
});

type ConfirmFormData = z.infer<typeof confirmSchema>;

export function ConfirmEmailForm() {
  const { confirmSignUp, isConfirming } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmSchema),
  });

  const onSubmit = (data: ConfirmFormData) => {
    confirmSignUp(data);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Confirmar Email</CardTitle>
        <CardDescription>
          Digite o código de confirmação enviado para seu email
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Código de Confirmação</Label>
            <Input
              id="code"
              type="text"
              placeholder="123456"
              maxLength={6}
              {...register("code")}
            />
            {errors.code && (
              <p className="text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isConfirming}>
            {isConfirming ? "Confirmando..." : "Confirmar"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}

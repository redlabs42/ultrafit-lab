"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { useAuthStore } from "@/store";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    newPassword: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export function AccountSettings() {
  const { user } = useAuthStore();
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    setIsChangingPassword(true);
    try {
      // TODO: Implement password change API call
      console.log("Password change:", data);
      toast.success("Senha alterada com sucesso!");
      reset();
    } catch (_error) {
      toast.error("Erro ao alterar senha");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações da Conta</CardTitle>
          <CardDescription>Suas informações de login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input value={user?.email} disabled />
          </div>
          <div className="grid gap-2">
            <Label>ID do Usuário</Label>
            <Input value={user?.id} disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>Atualize sua senha de acesso</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Senha Atual</Label>
              <Input
                id="currentPassword"
                type="password"
                {...register("currentPassword")}
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isChangingPassword}>
              {isChangingPassword ? "Alterando..." : "Alterar Senha"}
            </Button>
          </CardContent>
        </form>
      </Card>

      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">
            Zona de Perigo
          </CardTitle>
          <CardDescription>Ações irreversíveis para sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" disabled>
            Excluir Conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store";

export default function ProfilePage() {
  const { user } = useAuthStore();

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Perfil</h1>
          <p className="text-secondary text-lg">
            Gerencie suas informações pessoais
          </p>
        </div>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-2xl">Foto de Perfil</CardTitle>
            <CardDescription className="text-base">
              Sua foto será exibida em todo o aplicativo
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <Avatar className="h-24 w-24 ring-2 ring-primary/20">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <p className="text-sm text-secondary">
                JPG, PNG ou GIF. Máximo 2MB.
              </p>
              {/* TODO: Implement file upload */}
            </div>
          </CardContent>
        </Card>

        <ProfileForm />
      </div>
    </DashboardLayout>
  );
}

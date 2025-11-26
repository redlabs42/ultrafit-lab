"use client";

import { Calendar, Plus, TrendingUp } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { WorkoutCalendar } from "@/components/workout/WorkoutCalendar";
import { useActivePlan } from "@/hooks/useWorkout";

export default function WorkoutPage() {
  const { data: activePlan, isLoading } = useActivePlan();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Treino</h1>
            <p className="text-secondary text-lg">
              Gerencie seus planos de treino e exercícios
            </p>
          </div>
          <Button asChild>
            <Link href="/workout/generate">
              <Plus className="mr-2 h-4 w-4" />
              Gerar Plano com IA
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        ) : activePlan ? (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Plano Atual
                  </CardTitle>
                  <Calendar className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activePlan.name}</div>
                  <p className="text-sm text-secondary mt-1">
                    {activePlan.workouts.length} treinos
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Treinos/Semana
                  </CardTitle>
                  <TrendingUp className="h-5 w-5 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {activePlan.schedule.length}
                  </div>
                  <p className="text-sm text-secondary mt-1">
                    dias programados
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nível</CardTitle>
                  <span className="text-2xl">💪</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">
                    {activePlan.workouts[0]?.difficulty || "N/A"}
                  </div>
                  <p className="text-sm text-secondary mt-1">dificuldade</p>
                </CardContent>
              </Card>
            </div>

            <WorkoutCalendar plan={activePlan} />

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Próximo Treino</CardTitle>
                <CardDescription>Seu próximo treino agendado</CardDescription>
              </CardHeader>
              <CardContent>
                {activePlan.workouts.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-lg">
                          {activePlan.workouts[0].name}
                        </p>
                        <p className="text-sm text-secondary mt-1">
                          {activePlan.workouts[0].exercises.length} exercícios •
                          ~{activePlan.workouts[0].estimatedDuration} min
                        </p>
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/workout/plan">Ver Detalhes</Link>
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-secondary">
                    Nenhum treino disponível
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Nenhum Plano Ativo</CardTitle>
              <CardDescription>
                Você ainda não possui um plano de treino ativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/workout/generate">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Primeiro Plano
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

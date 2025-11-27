"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import { WorkoutCalendar } from "@/components/workout/WorkoutCalendar";
import { useActivePlan } from "@/hooks/useWorkout";

export default function WorkoutPlanPage() {
  const { data: plan, isLoading } = useActivePlan();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-64" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!plan) {
    return (
      <DashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle>Nenhum Plano Ativo</CardTitle>
            <CardDescription>
              Você ainda não possui um plano de treino ativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/workout/generate">Criar Plano</Link>
            </Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {plan.name}
          </h1>
          {plan.description && (
            <p className="text-secondary text-lg">{plan.description}</p>
          )}
        </div>

        <WorkoutCalendar plan={plan} />

        <div className="space-y-6">
          {plan.workouts.map((workout) => (
            <Card key={workout.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{workout.name}</CardTitle>
                    {workout.description && (
                      <CardDescription className="text-base mt-1">
                        {workout.description}
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">
                      {workout.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      ~{workout.estimatedDuration} min
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Exercícios:</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {workout.exercises.map((exercise) => (
                      <ExerciseCard
                        key={exercise.exercise.id}
                        exercise={exercise}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { WorkoutPlan } from "@/types";

interface WorkoutCalendarProps {
  plan: WorkoutPlan;
}

const daysOfWeek = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export function WorkoutCalendar({ plan }: WorkoutCalendarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendário Semanal</CardTitle>
        <CardDescription>
          Seus treinos programados para cada dia da semana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {daysOfWeek.map((day, index) => {
            const scheduledWorkout = plan.schedule.find(
              (s) => s.dayOfWeek === index,
            );
            const workout = scheduledWorkout
              ? plan.workouts.find((w) => w.id === scheduledWorkout.workoutId)
              : null;

            return (
              <div
                key={day}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-24 font-medium">{day}</div>
                  {workout ? (
                    <div>
                      <div className="font-medium">{workout.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {workout.exercises.length} exercícios • ~
                        {workout.estimatedDuration} min
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Descanso</span>
                  )}
                </div>
                {workout && (
                  <Badge variant="secondary">{workout.difficulty}</Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

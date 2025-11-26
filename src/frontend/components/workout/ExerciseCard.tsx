"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { difficultyColors } from "@/lib/theme-utils";
import type { WorkoutExercise } from "@/types";

interface ExerciseCardProps {
  exercise: WorkoutExercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{exercise.exercise.name}</CardTitle>
            {exercise.exercise.description && (
              <CardDescription className="mt-1">
                {exercise.exercise.description}
              </CardDescription>
            )}
          </div>
          <Badge className={difficultyColors[exercise.exercise.difficulty]}>
            {exercise.exercise.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{exercise.sets}</div>
            <div className="text-xs text-muted-foreground">Séries</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{exercise.reps}</div>
            <div className="text-xs text-muted-foreground">Reps</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{exercise.rest}s</div>
            <div className="text-xs text-muted-foreground">Descanso</div>
          </div>
        </div>

        {exercise.exercise.muscleGroup.length > 0 && (
          <div>
            <div className="text-sm font-medium mb-2">Grupos Musculares:</div>
            <div className="flex flex-wrap gap-1">
              {exercise.exercise.muscleGroup.map((muscle) => (
                <Badge key={muscle} variant="outline" className="text-xs">
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {exercise.exercise.equipment &&
          exercise.exercise.equipment.length > 0 && (
            <div>
              <div className="text-sm font-medium mb-2">Equipamentos:</div>
              <div className="flex flex-wrap gap-1">
                {exercise.exercise.equipment.map((equip) => (
                  <Badge key={equip} variant="secondary" className="text-xs">
                    {equip}
                  </Badge>
                ))}
              </div>
            </div>
          )}

        {exercise.notes && (
          <div className="pt-2 border-t">
            <div className="text-sm font-medium mb-1">Observações:</div>
            <p className="text-sm text-muted-foreground">{exercise.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

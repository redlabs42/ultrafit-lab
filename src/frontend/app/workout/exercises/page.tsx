"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useExercises } from "@/hooks/useWorkout";

export default function ExercisesPage() {
  const { data: exercises, isLoading } = useExercises();
  const [search, setSearch] = useState("");

  const filteredExercises = exercises?.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(search.toLowerCase()) ||
      exercise.muscleGroup.some((muscle) =>
        muscle.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Biblioteca de Exercícios
          </h1>
          <p className="text-muted-foreground">
            Explore todos os exercícios disponíveis
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar exercícios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : filteredExercises && filteredExercises.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    <Badge variant="secondary">{exercise.difficulty}</Badge>
                  </div>
                  {exercise.description && (
                    <CardDescription className="line-clamp-2">
                      {exercise.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <div className="text-sm font-medium mb-1">
                      Grupos Musculares:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {exercise.muscleGroup.map((muscle) => (
                        <Badge
                          key={muscle}
                          variant="outline"
                          className="text-xs"
                        >
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {exercise.equipment && exercise.equipment.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-1">
                        Equipamentos:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {exercise.equipment.map((equip) => (
                          <Badge
                            key={equip}
                            variant="secondary"
                            className="text-xs"
                          >
                            {equip}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Nenhum exercício encontrado
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

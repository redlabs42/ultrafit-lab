"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkoutLogs } from "@/hooks/useWorkout";
import { formatDate } from "@/lib/utils";

export default function ProgressPage() {
  const { data: logs, isLoading } = useWorkoutLogs();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Progresso</h1>
          <p className="text-secondary text-lg">
            Acompanhe sua evolução e histórico de treinos
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Treinos
              </CardTitle>
              <span className="text-3xl">💪</span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{logs?.length || 0}</div>
              <p className="text-sm text-secondary mt-1">treinos completados</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
              <span className="text-3xl">📅</span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-sm text-secondary mt-1">treinos este mês</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sequência</CardTitle>
              <span className="text-3xl">🔥</span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-sm text-secondary mt-1">dias consecutivos</p>
            </CardContent>
          </Card>
        </div>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-2xl">Histórico de Treinos</CardTitle>
            <CardDescription className="text-base">
              Seus treinos mais recentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20" />
                ))}
              </div>
            ) : logs && logs.length > 0 ? (
              <div className="space-y-3">
                {logs.slice(0, 10).map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface/50 hover:bg-surface transition-colors"
                  >
                    <div>
                      <p className="font-semibold">Treino #{log.workoutId}</p>
                      <p className="text-sm text-secondary mt-1">
                        {formatDate(log.date)} • {log.duration} min
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {log.exercises.length} exercícios
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-secondary text-center py-8">
                Nenhum treino registrado ainda. Complete seu primeiro treino!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

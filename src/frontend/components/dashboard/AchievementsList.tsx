import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, ChevronRight, Dumbbell, Flame, Target } from "lucide-react";

export function AchievementsList() {
  const achievements = [
    {
      icon: Dumbbell,
      name: "Primeira Série",
      locked: false,
      color: "primary",
    },
    {
      icon: Flame,
      name: "Sequência 7 dias",
      locked: true,
      color: "warning",
    },
    {
      icon: Target,
      name: "Meta Atingida",
      locked: true,
      color: "success",
    },
    {
      icon: Award,
      name: "Mestre Fitness",
      locked: true,
      color: "accent",
    },
  ];

  return (
    <Card className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-2xl shadow-2xl z-10 rounded-2xl sm:rounded-3xl">
      <div className="absolute inset-0 bg-linear-to-br from-warning/5 via-transparent to-primary/5 opacity-50" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-warning/10 rounded-full blur-3xl" />

      <CardHeader className="relative z-10 pb-2 sm:pb-6 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-warning to-primary rounded-xl sm:rounded-2xl blur-md opacity-50 animate-pulse" />
              <div className="relative bg-linear-to-r from-warning to-primary p-1.5 sm:p-2.5 rounded-lg sm:rounded-2xl">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-lg sm:text-2xl font-bold">
                Conquistas
              </CardTitle>
              <CardDescription className="text-xs sm:text-base">
                Suas medalhas e troféus
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80 rounded-xl text-xs sm:text-sm px-2 sm:px-3"
          >
            Ver todas
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.name}
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-3 sm:p-4 border transition-all duration-300 ${
                achievement.locked
                  ? "bg-muted/20 border-border/30 opacity-50"
                  : `bg-linear-to-br from-${achievement.color}/10 to-transparent border-${achievement.color}/30 hover:scale-105 hover:shadow-lg`
              }`}
            >
              <div className="text-center space-y-2">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl mx-auto flex items-center justify-center ${
                    achievement.locked
                      ? "bg-muted/30"
                      : `bg-linear-to-br from-${achievement.color}/20 to-${achievement.color}/10`
                  }`}
                >
                  <achievement.icon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      achievement.locked
                        ? "text-muted-foreground"
                        : `text-${achievement.color}`
                    }`}
                  />
                </div>
                <p className="text-xs font-semibold line-clamp-1">
                  {achievement.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

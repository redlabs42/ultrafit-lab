import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendLabel?: string;
  color?: "primary" | "accent" | "warning" | "success";
  className?: string;
  progress?: number;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  color = "primary",
  className,
  progress,
}: StatsCardProps) {
  const colorStyles = {
    primary: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary/20",
      gradient: "from-primary",
      shadow: "shadow-primary/20",
    },
    accent: {
      bg: "bg-accent/10",
      text: "text-accent",
      border: "border-accent/20",
      gradient: "from-accent",
      shadow: "shadow-accent/20",
    },
    warning: {
      bg: "bg-warning/10",
      text: "text-warning",
      border: "border-warning/20",
      gradient: "from-warning",
      shadow: "shadow-warning/20",
    },
    success: {
      bg: "bg-success/10",
      text: "text-success",
      border: "border-success/20",
      gradient: "from-success",
      shadow: "shadow-success/20",
    },
  };

  const styles = colorStyles[color];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-0 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-[1.02] rounded-2xl sm:rounded-3xl",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          styles.gradient
        )}
      />
      <div
        className={cn(
          "absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-3xl transition-colors duration-500",
          styles.bg
        )}
      />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-4 p-4 sm:p-6 relative z-10">
        <CardTitle className="text-xs sm:text-sm font-bold text-foreground/80 uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="relative">
          <div
            className={cn(
              "absolute inset-0 rounded-xl sm:rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity bg-linear-to-br",
              styles.gradient
            )}
          />
          <div
            className={cn(
              "relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl bg-linear-to-br",
              styles.gradient
            )}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
        <div>
          <div
            className={cn(
              "text-2xl sm:text-4xl font-black bg-clip-text text-transparent bg-linear-to-br",
              styles.gradient
            )}
          >
            {value}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {(trend || progress !== undefined) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{trendLabel}</span>
              <span className={cn("font-bold", styles.text)}>{trend}</span>
            </div>
            {progress !== undefined && (
              <div
                className={cn(
                  "relative h-1.5 sm:h-2 rounded-full overflow-hidden",
                  styles.bg
                )}
              >
                <div
                  className={cn(
                    "relative h-full transition-all duration-1000 shadow-lg rounded-full bg-linear-to-r",
                    styles.gradient
                  )}
                  style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

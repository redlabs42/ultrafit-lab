"use client";

import * as React from "react";
import { addDays, format, subDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarStripProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  className?: string;
}

export function CalendarStrip({
  selectedDate,
  onSelectDate,
  className,
}: CalendarStripProps) {
  const [startDate, setStartDate] = React.useState(subDays(selectedDate, 2));

  const days = React.useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => addDays(startDate, i));
  }, [startDate]);

  const handlePrevious = () => {
    setStartDate((prev) => subDays(prev, 1));
  };

  const handleNext = () => {
    setStartDate((prev) => addDays(prev, 1));
  };

  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={handlePrevious}
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex flex-1 justify-around gap-2">
        {days.map((date, i) => {
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, new Date());

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => onSelectDate(date)}
              className={cn(
                "flex flex-col items-center justify-center min-w-14 py-2 rounded-xl transition-all duration-200",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "bg-surface hover:bg-surface-hover text-muted-foreground hover:text-foreground border border-transparent hover:border-border/50",
                isToday &&
                  !isSelected &&
                  "border-primary/20 bg-primary/5 text-primary",
                // Hide first and last day on mobile (show 3 days), show all 5 on md+
                (i === 0 || i === 4) && "hidden md:flex"
              )}
            >
              <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">
                {format(date, "EEE", { locale: ptBR })}
              </span>
              <span
                className={cn(
                  "text-lg font-bold",
                  isSelected ? "text-white" : ""
                )}
              >
                {format(date, "d")}
              </span>
            </button>
          );
        })}
      </div>

      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={handleNext}
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

"use client";

import { Droplets, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface WaterTrackerProps {
  dailyGoal?: number; // in ml
}

export function WaterTracker({
  dailyGoal = 2500,
  date = new Date(),
}: WaterTrackerProps & { date?: Date }) {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const dateKey = date.toISOString().split("T")[0];

  // Load from local storage when date changes
  useEffect(() => {
    setIsClient(true);
    const history = JSON.parse(
      localStorage.getItem("water-tracker-history") || "{}",
    );
    setCurrentAmount(history[dateKey] || 0);
  }, [dateKey]);

  // Save to local storage whenever it changes
  useEffect(() => {
    if (isClient) {
      const history = JSON.parse(
        localStorage.getItem("water-tracker-history") || "{}",
      );
      history[dateKey] = currentAmount;
      localStorage.setItem("water-tracker-history", JSON.stringify(history));
    }
  }, [currentAmount, isClient, dateKey]);

  const addWater = (amount: number) => {
    setCurrentAmount((prev) => Math.min(prev + amount, 5000)); // Max 5L cap for sanity
  };

  const removeWater = (amount: number) => {
    setCurrentAmount((prev) => Math.max(prev - amount, 0));
  };

  const percentage = Math.min((currentAmount / dailyGoal) * 100, 100);

  return (
    <Card className="hover-lift border-blue-200/20 bg-linear-to-br from-card to-blue-500/5 dark:to-blue-500/10">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            Hidratação
          </CardTitle>
          <span className="text-sm font-medium text-secondary">
            Meta: {dailyGoal}ml
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-4 space-y-6">
          {/* Circular Progress or Main Display */}
          <div className="relative flex items-center justify-center">
            <div className="text-center z-10">
              <span className="text-4xl font-bold text-blue-500">
                {currentAmount}
              </span>
              <span className="text-sm text-secondary ml-1">ml</span>
            </div>
            {/* Simple visual ring effect could go here, for now using bar below */}
          </div>

          <div className="w-full space-y-2">
            <Progress
              value={percentage}
              className="h-3 bg-blue-100 dark:bg-blue-950"
              indicatorClassName="bg-blue-500"
            />
            <p className="text-xs text-center text-secondary">
              {percentage.toFixed(0)}% da meta diária
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addWater(250)}
              className="border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            >
              <Plus className="h-4 w-4 mr-1" /> 250ml
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addWater(500)}
              className="border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            >
              <Plus className="h-4 w-4 mr-1" /> 500ml
            </Button>
          </div>

          <div className="flex justify-center w-full">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground h-6"
              onClick={() => removeWater(250)}
              disabled={currentAmount === 0}
            >
              <Minus className="h-3 w-3 mr-1" /> Corrigir (-250ml)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

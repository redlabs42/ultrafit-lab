export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  time?: string;
  foods: Food[];
  macros: Macros;
  instructions?: string;
}

export interface Food {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  macros: Macros;
}

export interface NutritionPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  dailyMacros: Macros;
  meals: Meal[];
  status: "active" | "completed" | "draft";
  createdAt: string;
  updatedAt: string;
}

export interface NutritionGoal {
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  goal: "weight_loss" | "muscle_gain" | "maintenance";
}

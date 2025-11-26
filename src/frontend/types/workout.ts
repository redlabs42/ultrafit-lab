export interface Exercise {
  id: string;
  name: string;
  description?: string;
  muscleGroup: string[];
  equipment?: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  videoUrl?: string;
  imageUrl?: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  exercise: Exercise;
  sets: number;
  reps: number | string; // "8-12" or "10"
  rest: number; // seconds
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  estimatedDuration: number; // minutes
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  workouts: Workout[];
  schedule: WorkoutSchedule[];
  status: "active" | "completed" | "draft";
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutSchedule {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  workoutId: string;
}

export interface WorkoutLog {
  id: string;
  userId: string;
  workoutId: string;
  date: string;
  exercises: {
    exerciseId: string;
    sets: {
      reps: number;
      weight?: number;
      completed: boolean;
    }[];
  }[];
  duration: number; // minutes
  notes?: string;
}

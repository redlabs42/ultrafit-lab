export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  phone?: string;
  birthDate?: string;
  gender?: "male" | "female" | "other";
  height?: number; // cm
  weight?: number; // kg
  goals?: string[];
  activityLevel?: "sedentary" | "light" | "moderate" | "active" | "very_active";
  dietaryRestrictions?: string[];
  injuries?: string[];
  equipment?: string[];
  workoutFrequency?: number;
  experienceLevel?: "beginner" | "intermediate" | "advanced";
  subscriptionStatus?: "active" | "inactive" | "trial" | "cancelled";
  subscriptionPlan?: string;
}

export interface AuthUser {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

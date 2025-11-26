const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`,
    LOGOUT: `${API_BASE}/auth/logout`,
    REFRESH: `${API_BASE}/auth/refresh`,
    ME: `${API_BASE}/auth/me`,
  },

  // Users
  USERS: {
    BASE: `${API_BASE}/users`,
    PROFILE: (userId: string) => `${API_BASE}/users/${userId}/profile`,
    UPDATE: (userId: string) => `${API_BASE}/users/${userId}`,
  },

  // Payments
  PAYMENTS: {
    PLANS: `${API_BASE}/payments/plans`,
    SUBSCRIPTIONS: `${API_BASE}/payments/subscriptions`,
    SUBSCRIBE: `${API_BASE}/payments/subscribe`,
    CANCEL: (subscriptionId: string) =>
      `${API_BASE}/payments/subscriptions/${subscriptionId}/cancel`,
    HISTORY: `${API_BASE}/payments/history`,
    METHODS: `${API_BASE}/payments/methods`,
  },

  // Nutrition
  NUTRITION: {
    PLANS: `${API_BASE}/nutrition/plans`,
    PLAN: (planId: string) => `${API_BASE}/nutrition/plans/${planId}`,
    ACTIVE: `${API_BASE}/nutrition/plans/active`,
    GENERATE: `${API_BASE}/nutrition/generate`,
    MEALS: `${API_BASE}/nutrition/meals`,
  },

  // Workouts
  WORKOUTS: {
    PLANS: `${API_BASE}/workouts/plans`,
    PLAN: (planId: string) => `${API_BASE}/workouts/plans/${planId}`,
    ACTIVE: `${API_BASE}/workouts/plans/active`,
    GENERATE: `${API_BASE}/workouts/generate`,
    EXERCISES: `${API_BASE}/workouts/exercises`,
    LOGS: `${API_BASE}/workouts/logs`,
  },

  // AI
  AI: {
    GENERATE_NUTRITION: `${API_BASE}/ai/nutrition`,
    GENERATE_WORKOUT: `${API_BASE}/ai/workout`,
    CHAT: `${API_BASE}/ai/chat`,
  },

  // Insights
  INSIGHTS: {
    DASHBOARD: `${API_BASE}/insights/dashboard`,
    PROGRESS: `${API_BASE}/insights/progress`,
    METRICS: `${API_BASE}/insights/metrics`,
  },

  // Sales (Admin)
  SALES: {
    BASE: `${API_BASE}/sales`,
    LEADS: `${API_BASE}/sales/leads`,
    ANALYTICS: `${API_BASE}/sales/analytics`,
  },
} as const;

/**
 * Lazy loaded components for better performance
 * Use these for components that are not immediately visible
 */

import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// AI Components (heavy, load on demand)
export const AIAssistant = dynamic(
  () =>
    import("@/components/ai/AIAssistant").then((mod) => ({
      default: mod.AIAssistant,
    })),
  {
    loading: () => <LoadingSpinner size="lg" text="Carregando assistente..." />,
    ssr: false,
  },
);

export const GenerationProgress = dynamic(
  () =>
    import("@/components/ai/GenerationProgress").then((mod) => ({
      default: mod.GenerationProgress,
    })),
  {
    loading: () => <LoadingSpinner />,
  },
);

// Charts (can be heavy)
export const MacrosChart = dynamic(
  () =>
    import("@/components/nutrition/MacrosChart").then((mod) => ({
      default: mod.MacrosChart,
    })),
  {
    loading: () => <LoadingSpinner />,
  },
);

// Calendar (complex component)
export const WorkoutCalendar = dynamic(
  () =>
    import("@/components/workout/WorkoutCalendar").then((mod) => ({
      default: mod.WorkoutCalendar,
    })),
  {
    loading: () => <LoadingSpinner />,
  },
);

// Payment components (load on demand)
export const PaymentForm = dynamic(
  () =>
    import("@/components/payments/PaymentForm").then((mod) => ({
      default: mod.PaymentForm,
    })),
  {
    loading: () => <LoadingSpinner text="Carregando formulário..." />,
    ssr: false,
  },
);

export const PaymentHistory = dynamic(
  () =>
    import("@/components/payments/PaymentHistory").then((mod) => ({
      default: mod.PaymentHistory,
    })),
  {
    loading: () => <LoadingSpinner />,
  },
);

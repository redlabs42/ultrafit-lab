"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { paymentsService } from "@/services/payments";

export function useSubscription() {
  const queryClient = useQueryClient();

  // Get current subscription
  const { data: subscription, isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => paymentsService.getCurrentSubscription(),
  });

  // Cancel subscription mutation
  const cancelMutation = useMutation({
    mutationFn: (subscriptionId: string) =>
      paymentsService.cancelSubscription(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      toast.success("Assinatura cancelada com sucesso");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao cancelar assinatura");
    },
  });

  return {
    subscription,
    isLoading,
    isActive: subscription?.status === "active",
    isTrial: subscription?.status === "trial",
    cancelSubscription: cancelMutation.mutate,
    isCancelling: cancelMutation.isPending,
  };
}

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ["subscription-plans"],
    queryFn: () => paymentsService.getPlans(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSubscribe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      planId,
      paymentMethodId,
    }: {
      planId: string;
      paymentMethodId?: string;
    }) => paymentsService.subscribe(planId, paymentMethodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      toast.success("Assinatura realizada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao processar assinatura");
    },
  });
}

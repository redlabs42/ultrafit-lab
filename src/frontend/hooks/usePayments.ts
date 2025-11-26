"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { paymentsService } from "@/services/payments";

export function usePaymentHistory() {
  return useQuery({
    queryKey: ["payment-history"],
    queryFn: () => paymentsService.getPaymentHistory(),
  });
}

export function usePaymentMethods() {
  const queryClient = useQueryClient();

  const { data: methods, isLoading } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: () => paymentsService.getPaymentMethods(),
  });

  const addMethodMutation = useMutation({
    mutationFn: paymentsService.addPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
      toast.success("Método de pagamento adicionado");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao adicionar método de pagamento");
    },
  });

  const removeMethodMutation = useMutation({
    mutationFn: (methodId: string) =>
      paymentsService.removePaymentMethod(methodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
      toast.success("Método de pagamento removido");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao remover método de pagamento");
    },
  });

  return {
    methods,
    isLoading,
    addMethod: addMethodMutation.mutate,
    removeMethod: removeMethodMutation.mutate,
    isAdding: addMethodMutation.isPending,
    isRemoving: removeMethodMutation.isPending,
  };
}

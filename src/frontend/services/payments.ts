import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type {
  Payment,
  PaymentMethod,
  Subscription,
  SubscriptionPlan,
} from "@/types";

export const paymentsService = {
  // Get available subscription plans
  async getPlans(): Promise<SubscriptionPlan[]> {
    try {
      const response = await apiClient.get<SubscriptionPlan[]>(
        ENDPOINTS.PAYMENTS.PLANS,
      );
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch plans, using mock data", error);
      return [
        {
          id: "price_starter_monthly",
          name: "Starter",
          description: "Perfeito para quem está começando sua jornada fitness.",
          price: 19.9,
          currency: "BRL",
          interval: "monthly",
          features: [
            "Acesso a treinos básicos",
            "Rastreamento de progresso simples",
            "Comunidade de suporte",
            "5 receitas saudáveis por mês",
          ],
        },
        {
          id: "price_starter_yearly",
          name: "Starter",
          description: "Perfeito para quem está começando sua jornada fitness.",
          price: 198.2,
          currency: "BRL",
          interval: "yearly",
          features: [
            "Acesso a treinos básicos",
            "Rastreamento de progresso simples",
            "Comunidade de suporte",
            "5 receitas saudáveis por mês",
          ],
        },
        {
          id: "price_pro_monthly",
          name: "Pro",
          description:
            "A melhor escolha para resultados rápidos e consistentes.",
          price: 29.9,
          currency: "BRL",
          interval: "monthly",
          features: [
            "Tudo do plano Starter",
            "Treinos personalizados ilimitados",
            "Planos nutricionais completos",
            "Análise avançada de progresso",
            "Suporte prioritário",
          ],
          popular: true,
        },
        {
          id: "price_pro_yearly",
          name: "Pro",
          description:
            "A melhor escolha para resultados rápidos e consistentes.",
          price: 297.8,
          currency: "BRL",
          interval: "yearly",
          features: [
            "Tudo do plano Starter",
            "Treinos personalizados ilimitados",
            "Planos nutricionais completos",
            "Análise avançada de progresso",
            "Suporte prioritário",
          ],
          popular: true,
        },
        {
          id: "price_legend_monthly",
          name: "Legend",
          description:
            "Para quem busca o máximo de performance e exclusividade.",
          price: 49.9,
          currency: "BRL",
          interval: "monthly",
          features: [
            "Tudo do plano Pro",
            "Mentorias exclusivas mensais",
            "Acesso antecipado a novas features",
            "Merch exclusivo da marca",
            "Grupo VIP no WhatsApp",
          ],
        },
        {
          id: "price_legend_yearly",
          name: "Legend",
          description:
            "Para quem busca o máximo de performance e exclusividade.",
          price: 497.0,
          currency: "BRL",
          interval: "yearly",
          features: [
            "Tudo do plano Pro",
            "Mentorias exclusivas mensais",
            "Acesso antecipado a novas features",
            "Merch exclusivo da marca",
            "Grupo VIP no WhatsApp",
          ],
        },
      ];
    }
  },

  // Get current user subscription
  async getCurrentSubscription(): Promise<Subscription | null> {
    try {
      const response = await apiClient.get<Subscription>(
        ENDPOINTS.PAYMENTS.SUBSCRIPTIONS,
      );
      return response.data;
    } catch (_error) {
      return null;
    }
  },

  // Subscribe to a plan
  async subscribe(
    planId: string,
    paymentMethodId?: string,
  ): Promise<Subscription> {
    const response = await apiClient.post<Subscription>(
      ENDPOINTS.PAYMENTS.SUBSCRIBE,
      {
        planId,
        paymentMethodId,
      },
    );
    return response.data;
  },

  // Subscribe with PIX
  async subscribeWithPix(
    planId: string,
    cpfCnpj?: string,
  ): Promise<Subscription> {
    const response = await apiClient.post<Subscription>(
      ENDPOINTS.PAYMENTS.SUBSCRIBE,
      {
        planId,
        billingType: "PIX",
        cpfCnpj,
      },
    );
    return response.data;
  },

  // Cancel subscription
  async cancelSubscription(subscriptionId: string): Promise<void> {
    await apiClient.post(ENDPOINTS.PAYMENTS.CANCEL(subscriptionId));
  },

  // Get payment history
  async getPaymentHistory(): Promise<Payment[]> {
    const response = await apiClient.get<Payment[]>(ENDPOINTS.PAYMENTS.HISTORY);
    return response.data;
  },

  // Get payment methods
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await apiClient.get<PaymentMethod[]>(
      ENDPOINTS.PAYMENTS.METHODS,
    );
    return response.data;
  },

  // Add payment method
  async addPaymentMethod(data: {
    type: "credit_card" | "pix" | "boleto";
    cardNumber?: string;
    cardHolderName?: string;
    expiryMonth?: number;
    expiryYear?: number;
    cvv?: string;
    email?: string;
    cpfCnpj?: string;
    postalCode?: string;
    addressNumber?: string;
    addressComplement?: string;
    phone?: string;
    mobilePhone?: string;
  }): Promise<PaymentMethod> {
    const response = await apiClient.post<PaymentMethod>(
      ENDPOINTS.PAYMENTS.METHODS,
      data,
    );
    return response.data;
  },

  // Remove payment method
  async removePaymentMethod(methodId: string): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.PAYMENTS.METHODS}/${methodId}`);
  },
};

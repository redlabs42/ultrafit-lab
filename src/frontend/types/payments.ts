export interface SubscriptionPlan {
	id: string;
	name: string;
	description: string;
	price: number;
	currency: string;
	interval: "monthly" | "yearly";
	features: string[];
	popular?: boolean;
}

export interface Subscription {
	id: string;
	userId: string;
	planId: string;
	status: "active" | "inactive" | "trial" | "cancelled" | "past_due";
	currentPeriodStart: string;
	currentPeriodEnd: string;
	cancelAtPeriodEnd: boolean;
	createdAt: string;
	updatedAt: string;
	billingType?: "CREDIT_CARD" | "PIX" | "BOLETO";
	pixQrCode?: string;
	pixCopyPaste?: string;
}

export interface PixSubscriptionResponse {
	subscription: Subscription;
	qrCode: string;
	copyPaste: string;
}

export interface Payment {
	id: string;
	userId: string;
	subscriptionId: string;
	amount: number;
	currency: string;
	status: "pending" | "confirmed" | "failed" | "refunded";
	paymentMethod: string;
	invoiceUrl?: string;
	createdAt: string;
}

export interface PaymentMethod {
	id: string;
	type: "credit_card" | "pix" | "boleto";
	last4?: string;
	brand?: string;
	expiryMonth?: number;
	expiryYear?: number;
	isDefault: boolean;
}

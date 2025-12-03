export interface Payment {
  _id?: string;

  user_id: string;
  order_id: string;

  stripe_payment_intent: string;
  stripe_charge_id?: string;

  amount_paid: number;
  currency: string;

  payment_status: "processing" | "succeeded" | "failed";

  createdAt?: Date;
}

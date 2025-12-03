export interface Order {
  _id?: string;

  user_id: string;
  cart_id: string;

  order_items: {
    product_id: string; 
    quantity: number;
    price_at_purchase: number;
  }[];

  total_amount: number;

  order_status: "pending" | "paid" | "cancelled";

  stripe_session_id?: string;

  payment_id?: string;

  createdAt?: Date;
}

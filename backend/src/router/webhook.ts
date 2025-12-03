// webhook.ts
import { Request, Response } from "express";
import Stripe from "stripe";
import Cart from "../model/cart_model";
import Order from "../model/order_model";
import Payment from "../model/payment_model";
import Product from "../model/product_model";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key missing. Check .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("STRIPE WEBHOOK RECEIVED:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const user_id = session.metadata.user_id;
    const cart_id = session.metadata.cart_id;
    const payment_intent_id = session.payment_intent;

    const cart = await Cart.findById(cart_id).populate("items.product_id");
    if (!cart) return res.status(400).send("Cart not found");

    const order_items = cart.items.map((item: any) => ({
      product_id: item.product_id,
      quantity: item.cart_quantity,
      price_at_purchase: item.product_id.product_price,
    }));

    const total_amount = order_items.reduce(
      (sum: any, i: any) => sum + i.quantity * i.price_at_purchase,
      0
    );

    for (const item of cart.items) {
      if (item.cart_quantity > item.product_id.product_quantity) {
        return res.status(400).send("Not enough stock");
      }
    }

    // 1. Create ORDER first
    const order = await Order.create({
      user_id,
      cart_id,
      order_items,
      total_amount,
      order_status: "paid",
    });

    for (const item of order_items) {
      await Product.findByIdAndUpdate(
        item.product_id,
        { $inc: { product_quantity: -item.quantity } },
        { new: true }
      );
    }

    // 2. Create PAYMENT linked to order
    const paymentRecord = await Payment.create({
      user_id,
      order_id: order._id,
      stripe_payment_intent: payment_intent_id,
      amount_paid: total_amount,
      currency: "aud",
      payment_status: "succeeded",
    });

    // 3. Update order with payment ID
    order.payment_id = paymentRecord._id;
    await order.save();

    // 4. Clear Cart
    await Cart.findByIdAndDelete(cart_id);

    console.log("ORDER CREATED:", order._id);
  }

  res.json({ received: true });
};

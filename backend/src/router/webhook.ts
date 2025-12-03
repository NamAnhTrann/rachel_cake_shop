import { Request, Response } from "express";
import Stripe from "stripe";
import Order from "../model/order_model";
import Payment from "../model/payment_model";
import Cart from "../model/cart_model";
import express from "express";
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

router.post("/webhook", async function (req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error(" Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  //Case: payment pass
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const user_id = session.metadata.user_id;
    const cart_id = session.metadata.cart_id;
    const payment_intent_id = session.payment_intent;

    const cart = await Cart.findById(cart_id).populate("items.product_id");
    if (!cart) {
      return res.status(400).send("cart not found");
    }

    //order items
    const order_items = cart.items.map((item: any) => ({
      product_id: item.product_id,
      quantity: item.cart_quantity,
      price_at_purchase: item.product_id.product_price,
    }));

    const total_amount = order_items.reduce(
      (sum: any, i: any) => sum + i.quantity * i.price_at_purchase,
      0
    );

    //create payment
    const paymentRecord = await Payment.create({
      user_id,
      stripe_payment_intent: payment_intent_id,
      amount_paid: total_amount,
      currency: "aud",
      payment_status: "succeeded",
    });
    const order = await Order.create({
      user_id,
      cart_id,
      order_items,
      total_amount,
      order_status: "paid",
      payment_id: paymentRecord._id,
    });

    // Link Payment Order
    paymentRecord.order_id = order._id;
    await paymentRecord.save();

    // clear cart
    await Cart.findByIdAndDelete(cart_id);

    console.log(" Order created:", order._id);
  }

  return res.json({ received: true });
});

export default router;

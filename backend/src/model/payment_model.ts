import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },

  stripe_payment_intent: {
    type: String,
    required: true
  },

  stripe_charge_id: {
    type: String,
    required: false
  },

  amount_paid: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    default: "aud"
  },

  payment_status: {
    type: String,
    enum: ["processing", "succeeded", "failed"],
    required: true
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Payment", paymentSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true
  },

  order_items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price_at_purchase: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],

  total_amount: {
    type: Number,
    required: true,
    min: 0
  },

  order_status: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending"
  },

  stripe_session_id: {
    type: String,
    required: false
  },

  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: false
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);

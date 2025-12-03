"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cart_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    order_items: [
        {
            product_id: {
                type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Payment",
        required: false
    },
    createdAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model("Order", orderSchema);

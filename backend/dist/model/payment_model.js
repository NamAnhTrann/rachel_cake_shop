"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    order_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model("Payment", paymentSchema);

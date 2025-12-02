"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    product_title: {
        type: String,
        required: true,
    },
    product_description: {
        type: String,
        required: false,
    },
    product_price: {
        type: Number,
        required: true,
    },
    product_img: {
        type: String,
        required: true,
    },
    product_category: {
        type: String,
        enum: ["cake", "panna_cota", "brownies"],
        required: true
    },
    product_quantity: {
        type: Number,
        required: true,
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Product", productSchema);

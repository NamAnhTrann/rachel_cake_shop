"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_cart = exports.add_cart = void 0;
const cart_model_1 = __importDefault(require("../model/cart_model"));
const product_model_1 = __importDefault(require("../model/product_model"));
const add_cart = async function (req, res) {
    try {
        const { guest_id, product_id, quantity } = req.body;
        if (!guest_id || !product_id || !quantity) {
            return res.status(400).json({ message: "Missing Fields" });
        }
        let cart = await cart_model_1.default.findOne({ guest_id });
        if (!cart) {
            cart = await cart_model_1.default.create({
                guest_id,
                items: [],
                total_price: 0,
            });
        }
        const existing_cart = cart.items.find((item) => item.product_id.toString() === product_id);
        if (existing_cart) {
            existing_cart.cart_quantity += quantity;
        }
        else {
            cart.items.push({
                product_id,
                cart_quantity: quantity,
            });
        }
        let subtotal = 0;
        for (const item of cart.items) {
            const product = await product_model_1.default.findById(item.product_id);
            if (!product) {
                throw new Error("Product does not exist");
            }
            subtotal += product.product_price * item.cart_quantity;
        }
        cart.total_price = subtotal;
        cart.updatedAt = new Date();
        await cart.save();
        return res.json({
            message: "Item added to cart",
            total_price: subtotal,
            cart,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", err });
    }
};
exports.add_cart = add_cart;
const get_cart = async (req, res) => {
    const { guest_id } = req.body;
    const cart = await cart_model_1.default.findOne({ guest_id }).populate("items.product_id");
    return res.json({ cart });
};
exports.get_cart = get_cart;

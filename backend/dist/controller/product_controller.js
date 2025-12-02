"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list_single_product = exports.list_all_product = exports.add_product = void 0;
const product_model_1 = __importDefault(require("../model/product_model"));
const add_product = async function (req, res) {
    try {
        let newProduct = new product_model_1.default({
            product_title: req.body.product_title,
            product_description: req.body.product_description,
            product_price: req.body.product_price,
            product_category: req.body.product_category,
            product_quantity: req.body.product_quantity,
            product_img: req.body.product_img,
        });
        await newProduct.save();
        return res
            .status(200)
            .json({ data: newProduct, message: "Products added" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.add_product = add_product;
const list_all_product = async function (req, res) {
    try {
        let products = await product_model_1.default.find({});
        return res
            .status(200)
            .json({ data: products, message: "All products listed" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.list_all_product = list_all_product;
const list_single_product = async function (req, res) {
    try {
        let product_id = req.params.id;
        if (!product_id) {
            return res.status(400).json({ message: "Cannot find product id" });
        }
        let product = await product_model_1.default.findById(product_id);
        if (!product) {
            return res
                .status(400)
                .json({ message: `Product ${product_id} does not exist` });
        }
        return res
            .status(200)
            .json({ data: product, message: `Product ${product_id} is listed` });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.list_single_product = list_single_product;

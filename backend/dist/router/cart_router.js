"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const cart_controller_1 = require("../controller/cart_controller");
router.post("/add/cart", cart_controller_1.add_cart);
router.post("/list/cart", cart_controller_1.get_cart);
router.delete("/cart/delete/:guest_id/:product_id", cart_controller_1.delete_item_in_cart);
router.delete("/cart/delete-all/:guest_id", cart_controller_1.delete_whole_cart);
exports.default = router;

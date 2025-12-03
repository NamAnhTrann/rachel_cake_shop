"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const order_controller_1 = require("../controller/order_controller");
router.post("/start/checkout", order_controller_1.start_checkout);
router.get("/list/order/", order_controller_1.list_orders);
router.get("/orders/latest/:user_id", order_controller_1.getLatestOrder);
exports.default = router;

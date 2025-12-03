import express from "express";
const router= express.Router();

import {start_checkout, list_orders,getLatestOrder} from "../controller/order_controller";

router.post("/start/checkout", start_checkout);
router.get("/list/order/",list_orders)
router.get("/orders/latest/:user_id", getLatestOrder);

export default router;

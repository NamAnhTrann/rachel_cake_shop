import express from "express";
const router= express.Router();

import {start_checkout} from "../controller/order_controller";

router.post("/start/checkout", start_checkout);

export default router;

import express from "express";
const router= express.Router();

import {add_cart,get_cart} from "../controller/cart_controller";

router.post("/add/cart", add_cart);
router.post("/list/cart", get_cart);

export default router;

import express from "express";
const router= express.Router();

import {add_cart,get_cart, delete_item_in_cart, delete_whole_cart} from "../controller/cart_controller";

router.post("/add/cart", add_cart);
router.post("/list/cart", get_cart);
router.delete("/cart/delete/:guest_id/:product_id", delete_item_in_cart);
router.delete("/cart/delete-all/:guest_id", delete_whole_cart);

export default router;

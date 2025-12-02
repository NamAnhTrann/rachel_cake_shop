"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const product_controller_1 = require("../controller/product_controller");
router.post("/add/product", product_controller_1.add_product);
router.get("/list/all/products", product_controller_1.list_all_product);
router.get("/list/single/products/:id", product_controller_1.list_single_product);
exports.default = router;

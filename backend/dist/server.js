"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const webhook_1 = require("./router/webhook");
const app = (0, express_1.default)();
// 1. STRIPE WEBHOOK FIRST
app.post("/stripe/webhook", express_1.default.raw({ type: "application/json" }), webhook_1.stripeWebhook);
// 2. NORMAL JSON PARSING FOR THE REST
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:4200", "https://rachel-cake-shop.vercel.app"],
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}));
// All API routers
const contact_router_1 = __importDefault(require("./router/contact_router"));
const product_router_1 = __importDefault(require("./router/product_router"));
const cart_router_1 = __importDefault(require("./router/cart_router"));
const order_router_1 = __importDefault(require("./router/order_router"));
app.use("/api", contact_router_1.default);
app.use("/api", product_router_1.default);
app.use("/api", cart_router_1.default);
app.use("/api", order_router_1.default);
app.get("/", (_, res) => res.send("Backend running"));
mongoose_1.default
    .connect(process.env.MONGO_DB)
    .then(() => console.log("DB connected"))
    .catch(() => console.log("DB connection error"));
app.listen(process.env.PORT_NO, () => console.log("Server running on", process.env.PORT_NO));

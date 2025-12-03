require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { stripeWebhook } from "./router/webhook";



const app = express();

// 1. STRIPE WEBHOOK FIRST
app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// 2. NORMAL JSON PARSING FOR THE REST
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:4200", "https://rachel-cake-shop.vercel.app"],
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

// All API routers
import contact_router from "./router/contact_router";
import product_router from "./router/product_router";
import cart_router from "./router/cart_router";
import order_router from "./router/order_router";

app.use("/api", contact_router);
app.use("/api", product_router);
app.use("/api", cart_router);
app.use("/api", order_router);

app.get("/", (_, res) => res.send("Backend running"));

mongoose
  .connect(process.env.MONGO_DB as string)
  .then(() => console.log("DB connected"))
  .catch(() => console.log("DB connection error"));

app.listen(process.env.PORT_NO, () =>
  console.log("Server running on", process.env.PORT_NO)
);

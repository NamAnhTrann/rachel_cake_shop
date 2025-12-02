"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:4200", "https://rachel-cake-shop.vercel.app"],
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
//imports routers
const contact_router_1 = __importDefault(require("./router/contact_router"));
const product_router_1 = __importDefault(require("./router/product_router"));
const cart_router_1 = __importDefault(require("./router/cart_router"));
app.use("/api", contact_router_1.default);
app.use('/api', product_router_1.default);
app.use('/api', cart_router_1.default);
const port_no = process.env.PORT_NO;
const db_url = process.env.MONGO_DB;
app.listen(port_no, function (err) {
    if (err) {
        console.log("Error connecting to: 3030", err);
    }
    else {
        //this line here is to check null safety from TypeScript, so like anytime if anything can be null, just simply throw an error checks
        if (!port_no) {
            throw new Error("No port exist");
        }
        console.log("connected: ", port_no);
    }
});
async function connectDB() {
    try {
        //this line here is to check null safety from TypeScript, so like anytime if anything can be null, just simply throw an error checks
        if (!db_url) {
            throw new Error(`Error occured`);
        }
        await mongoose_1.default.connect(db_url);
        console.log("db connected");
    }
    catch (err) {
        console.log("error occured");
    }
}
app.get('/', function (req, res) {
    return res.send("Testing Backend");
});
connectDB();

import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:4200", "https://rachel-cake-shop.vercel.app"],
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//imports routers
import contact_router from "./router/contact_router";
import product_router from "./router/product_router";


app.use("/api", contact_router)
app.use('/api', product_router)

const port_no = process.env.PORT_NO;
const db_url = process.env.MONGO_DB;
app.listen(port_no, function (err) {
  if (err) {
    console.log("Error connecting to: 3030", err);
  } else {
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
    await mongoose.connect(db_url);
    console.log("db connected");
  } catch (err) {
    console.log("error occured");
  }
}

app.get('/', function(req: Request,res:Response){
    return res.send("Testing Backend")
})

connectDB();

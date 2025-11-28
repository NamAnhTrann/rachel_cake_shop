"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("SERVER STARTING...");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3030;
app.get("/", (req, res) => {
    res.send("hi");
});
app.listen(port, () => {
    console.log("connected on port", port);
});

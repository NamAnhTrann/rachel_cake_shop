"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let userSchema = new mongoose_1.default.Schema({
    user_first_name: {
        type: String,
        required: true
    },
    user_last_name: {
        type: String,
        required: true
    },
    user_phone_number: {
        type: String,
        required: false,
    },
    user_email: {
        type: String,
        required: false,
        sparse: true
    },
});
// productSchema.index({ contact_email: 1 });
exports.default = mongoose_1.default.model("User", userSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let contactSchema = new mongoose_1.default.Schema({
    contact_first_name: {
        type: String,
        required: true,
    },
    contact_last_name: {
        type: String,
        required: true
    },
    contact_email: {
        type: String,
        required: true,
    },
    contact_phone_number: {
        type: String,
        required: true,
    },
    contact_message: {
        type: String,
        required: true,
        minlength: [1, 'message is too short']
    },
    contact_enquiry_types: {
        type: String,
        enum: ["general", "about_product", "shipping"],
        required: true
    },
    contact_created_date: {
        type: Date,
        default: Date.now
    }
});
contactSchema.index({ contact_email: 1 });
exports.default = mongoose_1.default.model("Contact", contactSchema);

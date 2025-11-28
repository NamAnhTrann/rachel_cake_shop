"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list_all_contact = exports.add_contact = void 0;
const contact_model_1 = __importDefault(require("../model/contact_model"));
const add_contact = async function (req, res) {
    try {
        const newContact = new contact_model_1.default({
            ...req.body,
        });
        await newContact.save();
        return res.status(200).json({ data: newContact, message: "Contact Added" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.add_contact = add_contact;
const list_all_contact = async function (req, res) {
    try {
        let contacts = await contact_model_1.default.find({});
        return res.status(200).json({ data: contacts, message: "All contact listed" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.list_all_contact = list_all_contact;

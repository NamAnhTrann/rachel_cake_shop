"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list_all_contact = exports.add_contact = void 0;
const contact_model_1 = __importDefault(require("../model/contact_model"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const add_contact = async function (req, res) {
    try {
        const newContact = new contact_model_1.default({ ...req.body });
        await newContact.save();
        // Format enquiry type
        const enquiryClean = newContact.contact_enquiry_types
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        // Load email template
        const compiledHtmlString = fs_1.default.readFileSync(path_1.default.join(process.cwd(), "src/dopamine_contact.html"), "utf-8");
        const finalHtml = compiledHtmlString
            .replace(/{{contact_first_name}}/g, newContact.contact_first_name)
            .replace(/{{contact_message}}/g, newContact.contact_message)
            .replace(/{{contact_enquiry_types}}/g, enquiryClean);
        // Prepare email
        const mailOptions = {
            from: `"Dopamine" <${process.env.EMAIL_USER}>`,
            to: newContact.contact_email,
            subject: "We received your enquiry",
            html: finalHtml,
        };
        // SEND EMAIL WITH ERROR HANDLING
        try {
            await transporter.sendMail(mailOptions);
        }
        catch (emailErr) {
            console.error("EMAIL SEND FAILED:", emailErr.message);
            return res.status(400).json({
                message: "Contact saved, but email could not be sent.",
                error: emailErr.message,
                data: newContact,
            });
        }
        return res.status(200).json({
            data: newContact,
            message: "Contact Added & Email Sent",
        });
    }
    catch (err) {
        console.error("ADD CONTACT FAILED:", err.message);
        return res.status(500).json({ message: err.message });
    }
};
exports.add_contact = add_contact;
const list_all_contact = async function (req, res) {
    try {
        let contacts = await contact_model_1.default.find({});
        return res
            .status(200)
            .json({ data: contacts, message: "All contact listed!" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.list_all_contact = list_all_contact;

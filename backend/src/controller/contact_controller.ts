import Contact from "../model/contact_model";
import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export const add_contact = async function (req: Request, res: Response) {
  try {
    const newContact = new Contact({ ...req.body });
    await newContact.save();

    // Format enquiry type
    const enquiryClean = newContact.contact_enquiry_types
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Load email template
    const compiledHtmlString = fs.readFileSync(
      path.join(process.cwd(), "src/dopamine_contact.html"),
      "utf-8"
    );

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
    } catch (emailErr: any) {
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

  } catch (err: any) {
    console.error("ADD CONTACT FAILED:", err.message);
    return res.status(500).json({ message: err.message });
  }
};


export const list_all_contact = async function (req: Request, res: Response) {
  try {
    let contacts = await Contact.find({});
    return res
      .status(200)
      .json({ data: contacts, message: "All contact listed!" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

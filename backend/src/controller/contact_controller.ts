import Contact from "../model/contact_model";
import express, { Request, Response } from "express";

export const add_contact = async function (req: Request, res: Response) {
  try {
    const newContact = new Contact({
      ...req.body,
    });
    await newContact.save();
    return res.status(200).json({ data: newContact, message: "Contact Added" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const list_all_contact = async function (req: Request, res: Response) {
  try {
    let contacts = await Contact.find({});
    return res.status(200).json({ data: contacts, message: "All contact listed" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }

  
};

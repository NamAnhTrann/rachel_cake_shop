import express from "express";
const router= express.Router();

import {add_contact, list_all_contact} from "../controller/contact_controller";

router.post("/add/contact", add_contact);
router.get("/list/all/contacts", list_all_contact)

export default router;

import mongoose from "mongoose";

let contactSchema = new mongoose.Schema({
    contact_first_name: {
        type:String, 
        required: true,
    },

    contact_last_name: {
        type:String,
        required: true
    },

    contact_email:{
        type:String,
        required: true,
    },

    contact_phone_number:{
        type:String,
        required:true,
    },

    contact_message:{
        type:String,
        required: true,
        minlength: [1, 'message is too short']
    },

    contact_enquiry_types:{
        type:String,
        enum: ["general", "about_product", "shipping"],
        required: true
    },

    contact_created_date:{
        type:Date,
        default: Date.now
    }
})
contactSchema.index({ contact_email: 1 });

export default mongoose.model("Contact", contactSchema);

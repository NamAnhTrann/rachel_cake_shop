import mongoose from "mongoose";

let userSchema = new mongoose.Schema({

    user_first_name: {
        type:String,
        required: true
    },

    user_last_name: {
        type:String,
        required: true
    },

    user_password: {
        user:String,
        required:true,
    },
  
})
// productSchema.index({ contact_email: 1 });

export default mongoose.model("User", userSchema);

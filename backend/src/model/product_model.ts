import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_title: {
      type: String,
      required: true,
    },

    product_description: {
      type: String,
      required: false,
    },

    product_price: {
      type: Number,
      required: true,
    },

    product_img: {
      type: String,
      required: true,
    },

    product_category: {
      type: String,
      enum: ["cake", "panna_cota", "brownies"],
      required: true
    },

    product_quantity: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

import Product from "../model/product_model";
import express, { Request, Response } from "express";

export const add_product = async function (req: Request, res: Response) {
  try {
    let newProduct = new Product({
      product_title: req.body.product_title,
      product_description: req.body.product_description,
      product_price: req.body.product_price,
      product_category: req.body.product_category,
      product_quantity: req.body.product_quantity,
      product_img: req.body.product_img,
    });
    await newProduct.save();

    return res
      .status(200)
      .json({ data: newProduct, message: "Products added" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const list_all_product = async function (req: Request, res: Response) {
  try {
    let products = await Product.find({});
    return res
      .status(200)
      .json({ data: products, message: "All products listed" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const list_single_product = async function (
  req: Request,
  res: Response
) {
  try {
    let product_id = req.params.id;
    if (!product_id) {
      return res.status(400).json({ message: "Cannot find product id" });
    }

    let product = await Product.findById(product_id);
    if (!product) {
      return res
        .status(400)
        .json({ message: `Product ${product_id} does not exist` });
    }

    return res
      .status(200)
      .json({ data: product, message: `Product ${product_id} is listed` });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

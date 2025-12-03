import Cart from "../model/cart_model";
import Product from "../model/product_model";
import { Request, Response } from "express";

export const add_cart = async function (req: Request, res: Response) {
  try {
    const { guest_id, product_id, quantity } = req.body;

    if (!guest_id || !product_id || !quantity) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    let cart = await Cart.findOne({ guest_id });

    if (!cart) {
      cart = await Cart.create({
        guest_id,
        items: [],
        total_price: 0,
      });
    }

    const existing_cart = cart.items.find(
      (item: any) => item.product_id.toString() === product_id
    );

    if (existing_cart) {
      existing_cart.cart_quantity += quantity;
    } else {
      cart.items.push({
        product_id,
        cart_quantity: quantity,
      });
    }

    let subtotal = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        throw new Error("Product does not exist");
      }

      subtotal += product.product_price * item.cart_quantity;
    }

    cart.total_price = subtotal;
    cart.updatedAt = new Date();

    await cart.save();

    return res.json({
      message: "Item added to cart",
      total_price: subtotal,
      cart,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Server error", err });
  }
};

export const get_cart = async (req: Request, res: Response) => {
  const { guest_id } = req.body;

  const cart = await Cart.findOne({ guest_id }).populate("items.product_id");

  return res.json({ cart });
};

export const delete_item_in_cart = async function (
  req: Request,
  res: Response
) {
  try {
    const { guest_id, product_id } = req.params;

    if (!guest_id || !product_id) {
      return res
        .status(400)
        .json({ message: "Missing guest_id or product_id" });
    }

    const cart = await Cart.findOne({ guest_id }).populate("items.product_id");
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    // Remove the item
    cart.items = cart.items.filter(
      (item: any) =>
        String(item.product_id?._id || item.product_id) !== String(product_id)
    );

    // Recalculate total AFTER deletion
    let newTotal = 0;

    for (const item of cart.items) {
      const price = item.product_id.product_price; 
      newTotal += item.cart_quantity * price;
    }

    cart.total_price = newTotal;
    cart.updatedAt = new Date();

    await cart.save();

    return res.status(200).json({
      message: "Item removed from cart",
      cart,
    });
  } catch (err: any) {
    console.error("Delete item failed:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const delete_whole_cart = async function (req: Request, res: Response) {
  try {
    const { guest_id } = req.params;

    if (!guest_id) {
      return res.status(400).json({ message: "Missing guest_id" });
    }

    const cart = await Cart.findOne({ guest_id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await Cart.deleteOne({ guest_id });

    return res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err: any) {
    console.error("Error deleting entire cart:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

export interface CartItem {
  product_id: {
    _id: string;
    product_title: string;
    product_img: string;
    product_price: number;
  };
  cart_quantity: number;
}

export interface Cart {
  _id?: string;
  guest_id?: string;
  items: CartItem[];
  total_price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

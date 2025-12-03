import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Db } from '../services/db';
import { Cart } from '../model/cart_model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {
  cart: Cart | null = null;
  loading = true;
  showMenu = false;

  constructor(private db: Db) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const guest_id = this.db.getGuestId();

    this.db.get_cart(guest_id).subscribe({
      next: (res: any) => {
        this.cart = res.cart;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading cart:', err);
        this.loading = false;
      },
    });
  }

  deleteItem(product_id: string) {
    const guest_id = this.db.getGuestId();
    this.db.delete_cart_item(guest_id, product_id).subscribe({
      next: () => {
        this.loadCart();
        this.db.refreshCartCount();
      },
      error: (err: any) => console.error('delete item error', err),
    });
  }

  clearCart() {
    const guest_id = this.db.getGuestId();

    this.db.delete_whole_cart(guest_id).subscribe({
      next: () => {
        this.cart = null;
        this.db.refreshCartCount();
      },
      error: (err) => console.error('Clear cart error:', err),
    });
  }
}

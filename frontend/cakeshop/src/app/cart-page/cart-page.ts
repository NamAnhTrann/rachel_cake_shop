import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Db } from '../services/db';
import { Cart } from '../model/cart_model';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {

  cart: Cart | null = null;
  loading = true;

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
      error: (err) => {
        console.error('Error loading cart:', err);
        this.loading = false;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Db } from '../services/db';
import { Cart } from '../model/cart_model';

@Component({
  selector: 'app-checkout-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-detail.html',
  styleUrl: './checkout-detail.css',
})
export class CheckoutDetail implements OnInit {
  cart:Cart | null = null
  user_first_name = '';
  user_last_name = '';
  user_email = '';
  user_phone_number = '';
  cart_total = 0;
  loading = false;
  constructor(private db: Db) {}

ngOnInit(): void {
  const guest_id = this.db.getGuestId();

  this.db.get_cart(guest_id).subscribe({
    next: (res: any) => {
      this.cart = res.cart;
      this.cart_total = res.cart?.total_price || 0;
    },
    error: (err: any) => console.error(err),
  });
}

startCheckout() {
  // prevent double click
  if (this.loading) return;
  this.loading = true;

  const guest_id = this.db.getGuestId();

  const body = {
    guest_id,
    user_first_name: this.user_first_name,
    user_last_name: this.user_last_name,
    user_email: this.user_email,
    user_phone_number: this.user_phone_number,
  };

  this.db.start_checkout(body).subscribe({
    next: (res: any) => {
      localStorage.setItem("user_id", res.user_id);
      window.location.href = res.url; 
    },
    error: (err) => {
      console.error("Checkout error:", err);
      this.loading = false; 
    },
    complete: () => {
      this.loading = false; 
    }
  });
}

}

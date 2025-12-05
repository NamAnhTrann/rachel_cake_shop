import { Component } from '@angular/core';
import { Products } from '../model/product_model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Db } from '../services/db';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  product?: Products;
  quantity = 1;
  suggested: Products[] = [];
  maxLength = 2;

  constructor(private db: Db, private route: ActivatedRoute) {}

  private alertError(message: string) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',

      background: document.documentElement.classList.contains('dark')
        ? '#0C0A09'
        : '#FFF9EF',

      color: document.documentElement.classList.contains('dark')
        ? '#E5E5E5'
        : '#111827',

      iconColor: document.documentElement.classList.contains('dark')
        ? '#FACC15'
        : '#EA580C',

      confirmButtonColor: document.documentElement.classList.contains('dark')
        ? '#FACC15'
        : '#EA580C',

      confirmButtonText: 'Close',
      customClass: {
        confirmButton: 'swal-confirm',
      },
    });
  }

  ngOnInit(): void {
    // When the product changes
    this.route.paramMap.subscribe((params) => {
      const product_id = params.get('id');
      if (!product_id) return;

      this.load_single_product(product_id);
    });

    // When a fragment (#something) is present in the URL
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      }
    });
  }

  load_single_product(product_id: string) {
    this.db.list_single_product(product_id).subscribe({
      next: (data: any) => {
        this.product = data.data;

        const stock = this.product?.product_quantity ?? 1;
        this.maxLength = stock.toString().length;

        this.load_suggested_products(product_id);
        this.quantity = 1;
      },
      error: (err: any) => {
        console.error('error listing product', err);
        this.alertError('Failed to load product information.');
      },
    });
  }

  load_suggested_products(currentId: string) {
    this.db.list_all_product().subscribe({
      next: (data: any) => {
        const all = data.data;
        const filtered = all.filter((p: Products) => p._id !== currentId);
        this.suggested = filtered.slice(0, 4);
      },
      error: (err: any) => {
        console.error('error loading suggestions', err);
        this.alertError('Failed to load suggested products.');
      },
    });
  }

  decreaseQty() {
    this.quantity = Math.max(1, this.quantity - 1);
  }

  increaseQty() {
    const maxStock = this.product?.product_quantity || 1;
    if (this.quantity < maxStock) {
      this.quantity++;
    }
  }

  addToCart() {
    if (!this.product?._id) return;

    this.db.add_to_cart(this.product._id, this.quantity).subscribe({
      next: (res) => {
        console.log('Added to cart:', res);
        this.db.refreshCartCount();
        Swal.fire({
          title: 'Added to cart!',
          icon: 'success',

          background: document.documentElement.classList.contains('dark')
            ? '#0C0A09'
            : '#FFF9EF',

          color: document.documentElement.classList.contains('dark')
            ? '#E5E5E5'
            : '#111827',

          iconColor: document.documentElement.classList.contains('dark')
            ? '#FACC15'
            : '#EA580C',
          // Confirm button
          confirmButtonColor: document.documentElement.classList.contains(
            'dark'
          )
            ? '#FACC15'
            : '#EA580C',

          confirmButtonText: 'Okay!',
          customClass: {
            confirmButton: 'swal-confirm',
          },
        });
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        this.alertError('Unable to add item to cart.');
      },
    });
  }

  validateQty() {
    let raw = String(this.quantity).replace(/[^0-9]/g, '');

    // If user clears the field => immediately reset to 1
    if (raw === '' || raw === null) {
      this.quantity = 1;
      return;
    }

    let value = Number(raw);

    // Minimum value = 1
    if (value < 1) value = 1;

    const maxStock = this.product?.product_quantity || 1;
    if (value > maxStock) value = maxStock;
    this.quantity = value;
  }

  blockNonNumbers(event: KeyboardEvent) {
    const blockedKeys = ['-', '+', 'e', 'E', '.', ','];

    if (blockedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}

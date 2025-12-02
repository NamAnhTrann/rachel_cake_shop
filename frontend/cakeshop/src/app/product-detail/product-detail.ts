import { Component } from '@angular/core';
import { Products } from '../model/product_model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Db } from '../services/db';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private db: Db, private route: ActivatedRoute) {}

ngOnInit(): void {

  // When the product changes
  this.route.paramMap.subscribe(params => {
    const product_id = params.get('id');
    if (!product_id) return;

    this.load_single_product(product_id);
  });

  // When a fragment (#something) is present in the URL
  this.route.fragment.subscribe(fragment => {
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
        this.load_suggested_products(product_id);
        this.quantity = 1; // reset quantity on product change
      },
      error: (err: any) => console.error("error listing product", err)
    });
  }

  load_suggested_products(currentId: string) {
    this.db.list_all_product().subscribe({
      next: (data: any) => {
        const all = data.data;
        const filtered = all.filter((p: Products) => p._id !== currentId);
        this.suggested = filtered.slice(0, 4);
      },
      error: (err: any) => console.error("error loading suggestions", err)
    });
  }

  decreaseQty() {
    this.quantity = Math.max(1, this.quantity - 1);
  }

  increaseQty() {
    this.quantity = this.quantity + 1;
  }
}

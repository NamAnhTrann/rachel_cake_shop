import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Products } from '../model/product_model';
import { Db } from '../services/db';
import AOS from 'aos';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements AfterViewInit {
  product: Products[] = [];
  loading = true;
  product_data: Products = {
    product_title: '',
    product_description: '',
    product_price: 0,
    product_category: 'cake',
    product_quantity: 0,
    product_img: '',

  };

  constructor(private db: Db) {}

  ngAfterViewInit(): void {
  
    AOS.init({
      duration: 1200,
      once: true,
    });
  
    setTimeout(() => {
      AOS.refresh();
    }, 200);
  }

  ngOnInit(): void {
    this.list_all_products();
  }

list_all_products() {
  this.db.list_all_product().subscribe({
    next: (data: { data: Products[]; message: string }) => {
      this.product = data.data;
      this.loading = false;
    },
    error: (err: any) => {
      this.loading = false;
      console.error('Error loading products:', err);
    },
  });
}

}

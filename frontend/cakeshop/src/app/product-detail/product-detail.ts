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
[x: string]: any;
  product?: Products;
  quantity: number = 1;

  constructor(private db: Db, private route:ActivatedRoute){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.list_single_product();
  }


  list_single_product(){
    const product_id = this.route.snapshot.paramMap.get("id");
    if(!product_id){
      return;
    }

    this.db.list_single_product(product_id).subscribe({
      next:(data:any) => (this.product = data.data),
      error:(err:any) => console.error("error listing product",err)
    })
  }
decreaseQty() {
  this.quantity = Math.max(1, this.quantity - 1);
}

increaseQty() {
  this.quantity = this.quantity + 1;
}




}

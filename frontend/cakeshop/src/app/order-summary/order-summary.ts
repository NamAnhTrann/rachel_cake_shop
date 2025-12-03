import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Db } from '../services/db';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css'
})
export class OrderSummary {

  order: any = null;
  orderItems: any[] = [];
  sessionId: string | null = null;

  private db = inject(Db);
  private route = inject(ActivatedRoute);

  private userId: string | null = null;

ngOnInit(): void {
  this.sessionId = this.route.snapshot.queryParamMap.get('session_id');

  // Read the user_id you stored earlier
  this.userId = localStorage.getItem('user_id');

  if (!this.userId) {
    console.error("Missing user_id in localStorage");
    return;
  }

  this.listOrder();
}


  listOrder(): void {
    if (!this.userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    this.db.fetchLatestOrder(this.userId).subscribe((data: any) => {
      this.order = data.order;
      this.orderItems = data.order?.order_items || [];
    });
  }
}

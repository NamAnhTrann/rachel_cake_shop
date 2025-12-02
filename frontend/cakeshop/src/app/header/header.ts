import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Db } from '../services/db';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isShrunk = false;
  private lastScrollTop = 0;
  cartCount = 0;

  constructor(private db: Db) {}
  
  ngOnInit() {
    this.db.cartCount.subscribe(count => this.cartCount = count);
    this.db.refreshCartCount();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const current = window.scrollY;

    if (current > this.lastScrollTop && current > 20) {
      this.isShrunk = true;
    } else {
      this.isShrunk = false;
    }

    this.lastScrollTop = current <= 0 ? 0 : current;
  }
}

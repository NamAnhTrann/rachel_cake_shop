import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { Homepage } from './homepage/homepage';
import { Contact } from './contact/contact';
import { ProductDetail } from './product-detail/product-detail';
import { CartPage } from './cart-page/cart-page';
import { CheckoutDetail } from './checkout-detail/checkout-detail';
import { OrderSummary } from './order-summary/order-summary';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'product_list', component: ProductList },
  { path: 'product_detail/:id', component: ProductDetail },
  { path: 'contact_page', component: Contact },
  { path: 'cart_page', component: CartPage },
  { path: 'checkout-detail', component: CheckoutDetail },
    { path: 'order-summary-page', component: OrderSummary }




  
];

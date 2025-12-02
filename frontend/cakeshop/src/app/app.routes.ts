import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { Homepage } from './homepage/homepage';
import { Contact } from './contact/contact';
import { ProductDetail } from './product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'product_list', component: ProductList },
  { path: 'product_detail/:id', component: ProductDetail },
  { path: 'contact_page', component: Contact },
];

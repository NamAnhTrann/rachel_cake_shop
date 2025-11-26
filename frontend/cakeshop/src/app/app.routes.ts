import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { Homepage } from './homepage/homepage';
import { Contact } from './contact/contact';

export const routes: Routes = [
    {path: "", component:Homepage},
    {path: "product_list", component:ProductList},
    {path: "contact_page", component:Contact}

];

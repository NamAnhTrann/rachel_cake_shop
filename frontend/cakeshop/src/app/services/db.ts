import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../model/product_model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class Db {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    const hostname = window.location.hostname;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      this.baseUrl = 'http://localhost:4040';
    } else {
      this.baseUrl = 'https://rachelcakeshop-production.up.railway.app';
    }

    console.log('DbService using backend:', this.baseUrl);
  }

  //contacts
  add_contact(contact_data: any) {
    return this.http.post(
      `${this.baseUrl}/api/add/contact`,
      contact_data,
      httpOptions
    );
  }

  list_contact() {
    return this.http.get(`${this.baseUrl}/api/list/all/contacts`, httpOptions);
  }

  //product; s
  list_all_product() {
    return this.http.get<{ data: Products[]; message: string }>(`${this.baseUrl}/api/list/all/products`,httpOptions);
  }

  list_single_product(id: string) {
    return this.http.get(`${this.baseUrl}/list/single/products/${id}`,httpOptions);
  }
}

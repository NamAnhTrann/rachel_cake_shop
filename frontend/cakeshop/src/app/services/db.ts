import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
      this.baseUrl = 'https://rachel-cake-shop-znzn.vercel.app/';
    }

    console.log('DbService using backend:', this.baseUrl);
  }

  //contacts
  add_contact(contact_data: any){
    return this.http.post(`${this.baseUrl}/api/add/contact`, contact_data, httpOptions)
  }

  list_contact(){
    return this.http.post(`${this.baseUrl}/api/list/all/contacts`, httpOptions)
  }

}

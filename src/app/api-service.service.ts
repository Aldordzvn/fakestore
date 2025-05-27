import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  url = 'https://fakestoreapi.com/products';
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.url);
  }

  getSingleProduct(id: any): Observable<any>{
    const urlSingle = `${this.url}/${id}`;
    return this.httpClient.get<any>(urlSingle);
  }

  // getLimitedProducts(limit: number): Observable<any[]>{
  //   const urlLimited = `${this.url}?limit=${limit}`;
  //   console.log(urlLimited);
  //   return this.httpClient.get<any[]>(urlLimited);
  // }

  getProductsByCategory(category:any): Observable<any[]>{
    const urlCategory = `${this.url}/category/${category}`;
    return this.httpClient.get<any[]>(urlCategory);
  }

  getProductsCategories(): Observable<any[]>{
    const urlCategory = `${this.url}/categories`;
    return this.httpClient.get<any[]>(urlCategory);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { Category } from '../common/Category';
import { Product } from '../common/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

private baseUrl = 'http://productserviceloadbalancer-2101711574.ap-south-1.elb.amazonaws.com/api/v1';


  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/products`).pipe(retry(5));
  }


  getSelectedProduct(id: number): Observable<Product> {
    return this.httpClient
      .get<Product>(`${this.baseUrl}/products/${id}`)
      .pipe(retry(5));
  }

  //post a Product
  postProduct(Product: Object, type: number) {
    let user = sessionStorage.getItem('username');
    return this.httpClient.post(`${this.baseUrl}/products/${user}/${type}`, Product);
  }


  //find by name containing
  findByNameContaining(str: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseUrl}/searchproducts?str=${str}`
    );
  }

  //categories
  getProductCategories(): Observable<Category[]> {
    return this.httpClient.get<any>(`${this.baseUrl}/categories`).pipe(
      retry(3));
  }


  getProductListByCategoryId(theCategoryId: number): Observable<Product[]> {



    return this.httpClient.get<any>(`${this.baseUrl}/searchbycategory/${theCategoryId}`).pipe(
      retry(2)
    );
  }
  

  

}


import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Categories, PersonInterface, ProductInfo, UserInfo} from '../shop-interface'


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private url = `http://localhost:8080/`;


  constructor(private http: HttpClient) { }

  login(user_name: string, password: string): Observable<any> {
    const body = { user_name, password }; 
    return this.http.post<any>(this.url+`login`, body);
  }


  account(user: PersonInterface): Observable<PersonInterface>{
    console.log(user);
    return this.http.post<PersonInterface>(this.url+`user`, user);
  }

  users(): Observable<UserInfo[]>{
    return this.http.get<UserInfo[]>(this.url+`users`);
  }

  products(): Observable<ProductInfo[]> {
    return this.http.get<ProductInfo[]>(this.url+`products`);
  }

  product(productData: ProductInfo): Observable<any> {
    return this.http.post(this.url+`product`, productData);
  }
  updateProduct(productData: ProductInfo): Observable<any> {
    return this.http.put(this.url+`product`, productData);
  }

  deleteProduct(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(this.url+`product`, {params});

  }

  productDetails(id: number): Observable<ProductInfo> {
    const params = new HttpParams().set('id', id.toString())
    return this.http.get<ProductInfo>(this.url+ `product`,{params});
  }

  categories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.url+ `categories`);
  }

  sortBy(category_id: number): Observable<ProductInfo[]> {
    console.log(category_id)
    const params = new HttpParams().set('id', category_id.toString())
    return this.http.get<ProductInfo[]>(this.url+`category`, {params})
  }
}


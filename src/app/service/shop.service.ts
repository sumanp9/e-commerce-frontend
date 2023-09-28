import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';
import {PersonInterface, ProductInfo, UserInfo} from '../shop-interface'


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private url = `http://localhost:8080/`;


  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password }; 
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

}


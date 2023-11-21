import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Categories, PersonInterface, ProductInfo, TotalQuantity, Transaction, TransactionDetails, UserInfo} from '../shop-interface'
import { CartDetailsResponse } from '../cart-interface';


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
    return this.http.post(this.url+`product`, productData)
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

  addToCart(product: ProductInfo, user_id: number): Observable<any> {
    return this.http.post(this.url+ `cart`, {product, user_id});
  }

  getCartQuantity(user_id: number): Observable<TotalQuantity> {
    const params = new HttpParams().set('user_id', user_id.toString())

    return this.http.get<TotalQuantity>(this.url+`cartQuantity`, {params});
  }

  getCartData(user_id: number): Observable<CartDetailsResponse> {
    const params = new HttpParams().set('user_id', user_id.toString());
    return this.http.get<CartDetailsResponse>(this.url+'cartDetails', {params});
  }

  increaseQty(id: number, product_id: number, increment: boolean):  Observable<any> {
    return this.http.put<any>(this.url+`increaseCartQty`,  {id, product_id, increment})
  }

  deleteCartItem(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString())
    return this.http.delete<any>(this.url+`cartItem` , {params});
  }

  addCategory(category: string): Observable<any>{
    return this.http.post<any>(this.url+ `category`, {name: category});
  }

  checkout(stripeToken: any, amount: number): Observable<any> {
    return this.http.post<any>('http://localhost:8080/checkout', {token: stripeToken, amount: amount});
  }

  createTransaction(cartData: CartDetailsResponse, id: number, name: string, charge_id: string): Observable<any>{
    return this.http.put<any>(this.url+ `transaction`, {cartData, id, name, charge_id});
  }

  transactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url+ `transactions`);
  }
  transactionDetails(id: string): Observable<TransactionDetails[]> {
    const params = new HttpParams().set('transaction_id', id.toString())
    return this.http.get<TransactionDetails[]>(this.url+ 'transactionsDetails', {params})
  }

}
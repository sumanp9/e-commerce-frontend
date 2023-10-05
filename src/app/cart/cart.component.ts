import { Component } from '@angular/core';
import { UserInfo } from '../shop-interface';
import { ShopService } from '../service/shop.service';
import { CartDetailsResponse } from '../cart-interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  signedUser: UserInfo ={
    id: -1,
    name: '',
    email: '',
    role: ''

  }

  cartDetails: CartDetailsResponse = {
    data: [],
    grandTotal: 0
  };

  displayColumns: string[] = ['product', 'quantity', 'total'];

  constructor(
    private service: ShopService,
    private router: Router,
    private _snackBar: MatSnackBar
  ){ }

  ngOnInit() {
    this.signedUser = history.state.data;

    this.getCartData(this.signedUser.id);
  }

  getCartData(id: number) {
    this.service.getCartData(id).subscribe((result) => {
       
      this.cartDetails = result;
      console.log(this.cartDetails.data.length)
    })
  }
  


  incrementQuantity(id: number,product_id: number, increment: boolean, qty: number) {
    console.log(qty, increment)    
    if(qty >= 1 && increment) {
      console.log('Increment operation completed:');

      this.service.increaseQty(id, product_id, increment).subscribe((result)=>{
        this.getCartData(this.signedUser.id);
        this._snackBar.open(result,'Added item')
      });
    } else if(qty > 1 && !increment) {
      console.log('Decerement operation completed:');

      this.service.increaseQty(id, product_id, increment).subscribe((result)=>{
        this.getCartData(this.signedUser.id);
      });
    }
    
      else if(qty === 1 && !increment){

        this.deleteItem(id)
      }
  }

  deleteItem(id: number) {

    this.service.deleteCartItem(id).subscribe((res)=> {
      this.getCartData(this.signedUser.id);
    })
  }

  onCheckOut(): void{
    this.service.checkout(this.cartDetails);
  }

  return() {
    this.router.navigate(['/product'] , {state: {data: this.signedUser}});
  }

  
  logOut() {
    localStorage.clear;
    this.router.navigate(['/home'])
  }


  

}

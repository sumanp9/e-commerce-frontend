import { Component } from '@angular/core';
import { UserInfo } from '../shop-interface';
import { ShopService } from '../service/shop.service';
import { CartDetailsResponse } from '../cart-interface';
import { Router } from '@angular/router';

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
    private router: Router
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

  return() {
    this.router.navigate(['/product'] , {state: {data: this.signedUser}});
  }

  
  logOut() {
    localStorage.clear;
    this.router.navigate(['/home'])
  }

}

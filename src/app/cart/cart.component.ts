import { Component } from '@angular/core';
import { UserInfo } from '../shop-interface';
import { ShopService } from '../service/shop.service';
import { CartDetailsResponse } from '../cart-interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  paymentHandler: any =null;


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
    private _snackBar: MatSnackBar,
    private dialog: Dialog
  ){ }

  ngOnInit() {
    this.signedUser = history.state.data;

    this.getCartData(this.signedUser.id);
    this.invokeStripe();
  }

  getCartData(id: number) {
    this.service.getCartData(id).subscribe((result) => {
       
      this.cartDetails = result;
      console.log(this.cartDetails.data.length)
    })
  }
  


  incrementQuantity(id: number,product_id: number, increment: boolean, qty: number) {

    try {
      if(qty >= 1 && increment) {
        console.log('Increment operation completed:');
        this.service.increaseQty(id, product_id, increment).subscribe((result)=>{
          this._snackBar.open(result,'Added item')
        });
      } else if(qty > 1 && !increment) {
        console.log('Decerement operation completed:');
        this.service.increaseQty(id, product_id, increment).subscribe((result)=>{
          if(!result) {
            this._snackBar.open(result,'Decresed item')
          }
        });
      }
      else if(qty === 1 && !increment){
        this.deleteItem(id)
      }

    }finally{
      console.log("refreshing")
      this.getCartData(this.signedUser.id);
    }
  }

  deleteItem(id: number) {

    this.service.deleteCartItem(id).subscribe((res)=> {
      this.getCartData(this.signedUser.id);
    })
  }

  onCheckOut(): void{
    this.makePayment(this.cartDetails.grandTotal);
  }

  return() {
    this.router.navigate(['/product'] , {state: {data: this.signedUser}});
  }

  
  logOut() {
    localStorage.clear;
    this.router.navigate(['/home'])
  }


  makePayment(amount: number) {

    const paymentHandler = (<any>window).StripeCheckout.configure({

      key: 'pk_test_51NvpBYI46CkulZFbTrUQP79ByenmF7iOvnWhZuSI4VQsIfg5tELYi58hjg0SM6HWo3uSjGcTuzZDuuKC6UzegYhe00IFQhCABg',
      locale: 'auto',
      token: function(stripeToken: any) {
        console.log(stripeToken);

        paymentStripe(stripeToken)
      }

    });

    const paymentStripe = (stripeToken: any) => {
      this.service.checkout(stripeToken, this.cartDetails.grandTotal).subscribe((data) => {
        console.log(data)

        if(data.data === "Success") {
          console.log("Success Transaction");
          this.createTransaction();

        } else {
          console.log("Failure Transaction")
        }
      })
    }

    paymentHandler.open({
      name: "Shop",
      description: "Website for you to shop",
      amount: amount * 100
    })
  }

  invokeStripe(): void {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';

      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51NvpBYI46CkulZFbTrUQP79ByenmF7iOvnWhZuSI4VQsIfg5tELYi58hjg0SM6HWo3uSjGcTuzZDuuKC6UzegYhe00IFQhCABg' ,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  createTransaction(): void {
    console.log(this.cartDetails);
    this.service.createTransaction(this.cartDetails, this.signedUser.id).subscribe((result) => {
      this.getCartData(this.signedUser.id);
    });
  }
}

  
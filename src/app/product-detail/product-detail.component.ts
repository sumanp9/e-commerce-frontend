import { Component} from '@angular/core';
import { ShopService } from '../service/shop.service';
import { ProductInfo, UserInfo } from '../shop-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent {

  cartQuantity = 0;

  quantityValue =0;

  signedUser: UserInfo ={
    id: -1,
    name: '',
    email: '',
    role: ''

  }

  
  product: ProductInfo ={
    id: -1,
    name: '',
    image: '',
    description: '',
    details: '',
    price: -1,
    quantity: -1,
    category_id: -1
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void{
    this.signedUser = history.state.data;
    const id = history.state.id;
   
      this.service.productDetails(id).subscribe((result) =>{
        this.product = result;
        console.log(this.product.quantity)
      
    });

    this.getCartQuantity();    
   
  }

addToCart(product: ProductInfo): void {
  console.log(this.quantityValue);
    product.quantity = this.quantityValue;
    this.service.addToCart(product, this.signedUser.id).subscribe((res) => {
      this.quantityValue = 0;
      this.getCartQuantity();
      this.snackbar.open("Added item/s to cart", "close", {duration: 3000})
    }) 
}

addQuantity(increment: boolean) {
  this.quantityValue += increment ? 1 : -1;
}

getCartQuantity(): void {
  this.service.getCartQuantity(this.signedUser.id).subscribe((res) => {
    this.cartQuantity = res.totalQuantity;
  })
}

showCart(): void{
  this.router.navigate(['/cart'],  {state:{data: this.signedUser}})
}

return() {
  this.router.navigate(['/product'] , {state: {data: this.signedUser}});
}
  logOut() {
    this.router.navigate(['/home'])
  }
}

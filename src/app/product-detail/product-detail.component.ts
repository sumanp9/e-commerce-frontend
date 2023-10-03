import { Component} from '@angular/core';
import { ShopService } from '../service/shop.service';
import { ProductInfo, UserInfo } from '../shop-interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent {

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
    private service: ShopService
  ) {}

  ngOnInit(): void{
    this.signedUser = history.state.data;
    const id = history.state.id;
   
      this.service.productDetails(id).subscribe((result) =>{
        this.product = result;
        console.log(this.product)
      
    });
    
   
  }

  addToCart(product: ProductInfo) {
    alert("Added to cart!!")
  }

  return() {
    this.router.navigate(['/product'] , {state: {data: this.signedUser}});
  }


  logOut() {
    this.router.navigate(['/home'])
  }

}

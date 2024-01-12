import { Component } from '@angular/core';
import { UserInfo, ProductInfo, Categories } from '../shop-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../service/shop.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})


export class Product {

  signedUser: UserInfo ={
    id: -1,
    name: '',
    email: '',
    role: ''

  }

  productList: ProductInfo[] =[];

  categories: Categories[] =[];


  cartQuantity = 0;
  rating =0;

  constructor(
    private router: Router,
    public service: ShopService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.signedUser = history.state.data;
    this.getProducts();
    this.getCartQuantity();
    this.getCategories();
  }

  logOut(): void{
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  getCategories(): void {
    this.service.categories().subscribe((result) => {
      this.categories = result;
    })
  }

  sortBy(event: any): void {
    if(event.value === 0) {
      this.getProducts();
    } else {
    const category = event.value.id;
      this.service.sortBy(category).subscribe((result) => {
        this.productList = result
      })
    }
  }

  getProducts(): void{
    this.service.products().subscribe((result) => {
      this.productList = result;
    })
  }

  onCardClick(id: number): void {
    this.router.navigate(['/productDetail'],  {state:{data: this.signedUser, id: id}})// change name so it shows product?id=
  }
  getCartQuantity(): void {
    this.service.getCartQuantity(this.signedUser.id).subscribe((res) => {
      console.log(res)
      this.cartQuantity = res.totalQuantity;
    })
  }



  showCart(): void{
    this.router.navigate(['/cart'],  {state:{data: this.signedUser}})
  }
}

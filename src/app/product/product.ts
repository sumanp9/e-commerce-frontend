import { Component } from '@angular/core';
import { UserInfo, ProductInfo } from '../shop-interface';
import { Router } from '@angular/router';
import { ShopService } from '../service/shop.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

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

  constructor(
    private router: Router,
    public service: ShopService,
    private dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.signedUser = history.state.data;
    this.getProducts();
  }

  logOut(): void{
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  getProducts(): void{
    this.service.products().subscribe((result) => {
      this.productList = result;
    })
  }

  onCardClick(id: number): void {
    this.dialog.open(ProductDetailComponent, {data: id})
  }

  addToCart(product: ProductInfo): void {
      alert("Added to cart!!!")
  }
}

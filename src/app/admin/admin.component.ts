import { Component, Inject } from '@angular/core';
import { Categories, ProductInfo, UserInfo } from '../shop-interface';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShopService } from '../service/shop.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../product/product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  signedUser: UserInfo ={
    id: -1,
    name: '',
    email: '',
    role: ''

  }
  userList: UserInfo[] =[];
  productList: ProductInfo[] =[];
  categories: Categories[] =[];

  displayUsers = false;
  displayProducts = false;

  constructor(
    private router: Router,
    public service: ShopService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

   this.signedUser = history.state.data;
   console.log(this.signedUser)
   this.getProducts();
   this.getCategories();
  }

  getUsers(): void{
    this.displayUsers = true;
    this.displayProducts = false;
    this.service.users().subscribe((result) => {
      this.userList = result;
      console.log(this.userList)
    })
  }

  getProducts(): void{
    this.displayProducts = true;
    this.displayUsers = false;
    this.service.products().subscribe((result) => {
      this.productList = result;

      console.log(this.productList)
    })
  }

  getCategories(): void {
    this.service.categories().subscribe((result) => {
      this.categories = result;
    })
  }

  add(): void{
    const dialogRef = this.dialog.open(AddProductComponent).afterClosed().subscribe((res) => {
      this.getProducts();
    })
  }

  update(product: ProductInfo): void {
    const dialogRef = this.dialog.open(AddProductComponent, {data: product}).afterClosed().subscribe((res=> {
      this.getProducts();
    }));
  }

  delete(id: number): void {
    this.service.deleteProduct(id).subscribe((res) => {
      console.log(res);
      this.getProducts();
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

  logOut(): void{
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  
}

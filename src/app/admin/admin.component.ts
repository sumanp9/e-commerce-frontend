import { Component, Inject } from '@angular/core';
import { ProductInfo, UserInfo } from '../shop-interface';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShopService } from '../service/shop.service';
import { AddProductComponent } from '../add-product/add-product.component';

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

  constructor(
    private router: Router,
    public service: ShopService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

   this.signedUser = history.state.data;
   console.log(this.signedUser)
  }

  getUsers(): void{
    this.service.users().subscribe((result) => {
      this.userList = result;
      console.log(this.userList)
    })
  }

  getProducts(): void{
    this.service.products().subscribe((result) => {
      this.productList = result;

      console.log(this.productList)
    })
  }

  addProduct(): void{
    const dialogRef = this.dialog.open(AddProductComponent).afterClosed().subscribe((res) => {
      this.getProducts();
    })
  }

  logOut(): void{
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  
}

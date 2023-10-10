import { Component } from '@angular/core';
import { Categories, ProductInfo, UserInfo } from '../shop-interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShopService } from '../service/shop.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
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
  errorMessage: any;

  private durationInSeconds: number =3000;

  constructor(
    private router: Router,
    public service: ShopService,
    private dialog: MatDialog,
    private _snackbar: MatSnackBar,
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
    const dialogRef = this.dialog.open(AddProductComponent, {disableClose: true}).afterClosed().subscribe((result) => {
      this.getProducts();
            this._snackbar.open('Product Added successfully', 'Close', {
              duration: 3000, 
            });
        
      }, (error) => {
        this.errorMessage = error;
      });
  }




  update(product: ProductInfo): void {
    this.dialog.open(AddProductComponent, {disableClose: true,   data: product}).afterClosed().subscribe(
      {
        next: (result) => {
          if(!result) {
            console.log("updating result")
            this.getProducts();
            this._snackbar.open("Product Updated successfully", 'Close',{
            duration: this.durationInSeconds
          });
        } else {
          console.log("hello")
        }
        },
        error: (err) => {
          console.error(err);
        }
      } 
   
    );
  }

  delete(id: number): void {
    this.service.deleteProduct(id).subscribe((res) => {
      this.getProducts();
      this._snackbar.open("Product Deleted successfully", 'Close',{
        duration: this.durationInSeconds
      });

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

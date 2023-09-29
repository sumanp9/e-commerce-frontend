import { Component } from '@angular/core';
import { UserInfo, ProductInfo } from '../shop-interface';
import { Router } from '@angular/router';
import { ShopService } from '../service/shop.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})


export class UserHomeComponent {

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

      console.log(this.productList)
    })
  }

  onCardClick(id: number) {

    alert("id, "+ id)
  }
}

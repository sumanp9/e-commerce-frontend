import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ShopService } from '../service/shop.service';
import { UserInfo } from '../shop-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'ecommerce-frontend';
  email:string = "";
  password: string ="";
  hide: boolean = true;

  signedUser: UserInfo ={
    id: -1,
    name: '',
    email: '',
    role: ''

  }

  constructor(private dialog: MatDialog,
    private service: ShopService,
    private router: Router) {}

  signIn(): void{
    this.service.login(this.email, this.password).subscribe((res) => {
     this.signedUser = res.user;
     if(this.signedUser.role === 'Admin') {
      localStorage.setItem('signedUser', JSON.stringify(this.signedUser)); 
      this.router.navigate(['/admin'],  {state:{data: this.signedUser}})
    } else {
      console.log('This is a User')
        this.userPage(this.signedUser);
     }
    });
    
  }

  createAccount(): void{
    console.log("Create Account")
    this.dialog.open(SignUpComponent).afterClosed().subscribe((res) => {
      this.router.navigateByUrl('/product');
    });
  }

  userPage(user: UserInfo): void {
    localStorage.setItem('signedUser', JSON.stringify(user)); 
    this.router.navigate(['/product'] , {state: {data: user}})
  }

  togglePasswordVisibility(): void{
    this.hide = !this.hide;
  }

  disabledLogin(email: string, password: string): boolean {
    console.log(email, password)
    if(email.length == 0 || password.length==0) return true
    return false;
  }

 
}

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
  username:string = "";
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

  
  ngOnInit() {
   localStorage.clear();
  }

  signIn(): void{
    this.service.login(this.username, this.password).subscribe((res) => {
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
    this.dialog.open(SignUpComponent, {disableClose: true,}).afterClosed().subscribe((result) => {
      console.log("result it: "+  result)
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
    if(email.length == 0 || password.length==0) return true
    return false;
  }

 
}

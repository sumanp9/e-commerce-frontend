import { Component } from '@angular/core';
import { PersonInterface, UserInfo } from '../shop-interface';
import { ShopService } from '../service/shop.service';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-password-verification',
  templateUrl: './password-verification.component.html',
  styleUrls: ['./password-verification.component.css']
})

export class PasswordVerificationComponent {

  password = '';
  verifyPassword ='';

  hide = true;
  user: PersonInterface = {
    name: '',
    user_name: '',
    address: '',
    email: '',
    password: '',
    phone: ''
  }

  newUser: UserInfo ={
    id: -1,
    name: '',
    email: '',
    role: ''

  }

  constructor(
    private service: ShopService,
    private router: Router
  ){}

  ngOnInit() {
    this.user = history.state.data;

  }


  verification() {
    if(this.password === this.verifyPassword) {
      return true;
    } return false;
  }


  togglePasswordVisibility(): void{
    this.hide = !this.hide;
  }

  isEmpty() {
    if(this.password === '' || this.verifyPassword =='') {
      return true;
    } return false;
  }

  async signUp(){
    this.service.account(this.user).pipe(
      switchMap((accountResponse) => {
        if (accountResponse) {
          // If account is successful, proceed to login
          return this.service.login(this.user.user_name, this.user.password);
        } else {
          // Handle the case where account creation failed
          return of(null);
        }
      })
    ).subscribe((loginResponse) => {
      if (loginResponse) {
        // Process the login response
        console.log(loginResponse)
        this.newUser = loginResponse.userData.user;
        if (this.newUser.role === 'User') {
          localStorage.setItem('signedUser', JSON.stringify(this.newUser)); 
          this.router.navigate(['/product'], { state: { data: this.newUser } });
        } else {
          console.log(this.newUser.name, this.newUser.role);
        }
      }
    });
    
}
}

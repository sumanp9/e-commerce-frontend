import { Component } from '@angular/core';

@Component({
  selector: 'app-password-verification',
  templateUrl: './password-verification.component.html',
  styleUrls: ['./password-verification.component.css']
})

export class PasswordVerificationComponent {

  password = '';
  verifyPassword ='';

  hide = true;

  constructor(){}


  verification() {
    if(this.password === this.verifyPassword) {
      return true;
    } return false;
  }


  togglePasswordVisibility(): void{
    this.hide = !this.hide;
  }
}

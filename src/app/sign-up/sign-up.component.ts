import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ShopService } from '../service/shop.service';
import { PersonInterface } from '../shop-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  name: string ="";
  email: string ="";
  password: string ="";
  phone: string="";
  address: string ="";

  user: PersonInterface = {
    name: '',
    user_name: '',
    address: '',
    email: '',
    password: '',
    phone: ''
  }

  hide: boolean = true;
  showUrl: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<SignUpComponent>,
    private router: Router
  ) {}
  

  next(): void{
    this.showUrl = true;
  }

  togglePasswordVisibility(): void{
    this.hide = !this.hide;
  }

  disableSave(): boolean {
    const { name, email, phone, user_name, address } = this.user;
    return !name || !email || !phone || !user_name || !address;
  }
  

  verify(): void {
    this.dialogRef.close();
    localStorage.setItem('signedUser', JSON.stringify(this.user)); 
    this.router.navigate(['/verify-password'], {state: {data: this.user}});

  }
  }

  

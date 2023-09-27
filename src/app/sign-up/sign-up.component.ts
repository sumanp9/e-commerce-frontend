import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ShopService } from '../service/shop.service';
import { PersonInterface } from '../shop-interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  name: string ="";
  email: string ="";
  password: string ="";
  phone: string=""

  user: PersonInterface = {
    name: '',
    email: '',
    password: '',
    phone: ''
  }

  hide: boolean = true;


  constructor(
    public dialogRef: MatDialogRef<SignUpComponent>,
    private service: ShopService
  ) {}
  

  createAccount(): void{
    this.service.account(this.user).subscribe((response) =>{
      console.log("Added user", response)
    });
    this.dialogRef.close() 
  }

  togglePasswordVisibility(): void{
    this.hide = !this.hide;
  }

  disableSave(): boolean {
    if(this.user.name =='' || this.user.email=='' || this.user.password=='' || this.user.phone =='') {
      return true;
    }return false;
  }

  
}

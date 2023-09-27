import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce-frontend';
  email:string = "";
  password: string ="";
  hide: boolean = true;

  constructor(private dialog: MatDialog) {}

  signIn(): void{
    console.log(this.email, this.password);
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

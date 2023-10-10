import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {


    const signedUserString = localStorage.getItem('signedUser');

   
    if (signedUserString) {
      const signedUser = JSON.parse(signedUserString);
      console.log("Uer trying to sign in" + signedUser.role);

      if (signedUser && signedUser.role === 'Admin') {
        return true; // Allow access to the 'admin' route
      }else if(signedUser && signedUser.role === 'User') {
        // Allow access to the user-home route for regular users
        if (state.url.includes('/product') || state.url.includes('/productDetail')|| state.url.includes('/cart')){
          return true;
        }
      } else if(signedUser && !signedUser.role ) {
        console.log("new user"+ signedUser.name)
          if(state.url.includes('/verify-password')) {
            return true;
          }
      }
    }
      this.router.navigate(['/home']);
      return false; 
    }
  }
  


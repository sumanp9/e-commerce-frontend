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

      if (signedUser && signedUser.role === 'Admin') {
        return true; // Allow access to the 'admin' route
      }
    }
      this.router.navigate(['/home']);
      return false; 
    }
  }
  


import { Component, Inject } from '@angular/core';
import { UserInfo } from '../shop-interface';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShopService } from '../service/shop.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  signedUser: UserInfo ={
    id: -1,
    name: '',
    email: '',
    role: ''

  }
  constructor(
    private route: ActivatedRoute,
    public service: ShopService
  ) {}

  ngOnInit(): void {
    this.signedUser = this.route.snapshot?.data['signedUser'];
    console.log('Received signed user:', this.signedUser);
  }

  
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list'; 
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';  
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatBadgeModule} from '@angular/material/badge'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component'; 
import { AuthGuardService } from './auth/auth-guard.service';
import { AddProductComponent } from './add-product/add-product.component';
import {Product} from './product/product'
import { ProductDetailComponent } from './product-detail/product-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    AdminComponent,
    TestComponent,
    HomeComponent,
    AddProductComponent,
    Product,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatTooltipModule,
    MatBadgeModule,

    BrowserAnimationsModule,
     AppRoutingModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

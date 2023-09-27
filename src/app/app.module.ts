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


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component'; 


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    AdminComponent,
    TestComponent,
    HomeComponent
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

    BrowserAnimationsModule,
     AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { Product } from './product/product';
import { PasswordVerificationComponent } from './password-verification/password-verification.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes =[
  {path: 'home', component: HomeComponent},
  {path: 'verify-password', component: PasswordVerificationComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService]},
  {path: 'product', component: Product, canActivate: [AuthGuardService]},
  {path: 'productDetail', component: ProductDetailComponent, canActivate: [AuthGuardService]},


  { path: '**', redirectTo: 'home' }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }

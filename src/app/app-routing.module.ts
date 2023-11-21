import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { Product } from './product/product';
import { PasswordVerificationComponent } from './password-verification/password-verification.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { TestComponent } from './test/test.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

const routes: Routes =[
  {path: 'home', component: HomeComponent},
  {path: 'verify-password', component: PasswordVerificationComponent, canActivate: [AuthGuardService]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService]},
  {path: 'product', component: Product, canActivate: [AuthGuardService]},
  {path: 'productDetail', component: ProductDetailComponent, canActivate: [AuthGuardService]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuardService]},
  {path:'test', component: TestComponent},
//  {path: 'details', component: TransactionDetailsComponent, canActivate:[AuthGuardService]},

{path: 'details', component: TransactionDetailsComponent},
  { path: '**', redirectTo: 'home' }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }

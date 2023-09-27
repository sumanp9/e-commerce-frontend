import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes =[
  {path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService]},
  {path: 'test', component: TestComponent},


  { path: '**', redirectTo: 'home' }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }

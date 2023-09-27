import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';

const routes: Routes =[
  {path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'test', component: TestComponent},


  { path: '**', redirectTo: '' }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './admin/admin.component';
import { FaqComponent } from './faq/faq.component';
import { CartComponent } from './cart/cart.component';
import { ListmyorderComponent } from './listmyorder/listmyorder.component';
const routes: Routes = [
  { path:'', component:LoginComponent},
  {path:'cart',component:CartComponent},
  {path:'faq',component:FaqComponent},
  {path:'home', component:HomeComponent},
  {path:'product',component:ProductComponent},
  { path:'signup', component:SignupComponent},
  { path:'login', component:LoginComponent},
  { path:'admin',component:AdminComponent},
  {path:'orders',component:ListmyorderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

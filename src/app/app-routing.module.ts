import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/Login/Login.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { SignoutComponent } from './components/signout/signout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';


const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'home', component: ProductComponent },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'signout',component:SignoutComponent  },
    {path: 'category/:id', component: ProductComponent},
    {
    path: 'product/:id',
    component: ProductViewComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'addproduct',
    component: AddProductComponent,
    canActivate: [AuthGaurdService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

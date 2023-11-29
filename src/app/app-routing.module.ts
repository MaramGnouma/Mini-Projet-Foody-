import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Compoents/home/home.component';
import { DetailsFoodComponent } from './Compoents/details-food/details-food.component';
import { FoodAddComponent } from './Compoents/food-add/food-add.component';
import { ModifFoodComponent } from './Compoents/modif-food/modif-food.component';
import { LoginComponent } from './Compoents/login/login.component';
import { RegisterComponent } from './Compoents/register/register.component';
import { AuthGuard2Service } from './auth-guard2.service';
import { HeaderComponent } from './Compoents/header/header.component';
import { MenuComponent } from './Compoents/menu/menu.component';
import { GestionfoodComponent } from './Compoents/gestionfood/gestionfood.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to login page if the path is empty
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'header',component:HeaderComponent},
  {path:'menu',component:MenuComponent},
  {
    path: 'home',
    component: HomeComponent,
     // Use the AuthGuard to protect the route
  },
  { path: 'foods/:id', component: DetailsFoodComponent },
  { path: 'gerer', component: GestionfoodComponent,
  canActivate: [AuthGuard2Service] },
  { path: 'add', component: FoodAddComponent },
  { path: 'foodsupdate/:id', component: ModifFoodComponent },
  { path: 'search/:txt', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

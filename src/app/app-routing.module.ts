import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Compoents/home/home.component';
import { DetailsFoodComponent } from './Compoents/details-food/details-food.component';
import { ModifFoodComponent } from './Compoents/modif-food/modif-food.component';
import { LoginComponent } from './Compoents/login/login.component';
import { RegisterComponent } from './Compoents/register/register.component';
import { HeaderComponent } from './Compoents/header/header.component';
import { MenuComponent } from './Compoents/menu/menu.component';
import { GestionfoodComponent } from './Compoents/gestionfood/gestionfood.component';
import { GererFoodsComponent } from './Compoents/gerer-foods/gerer-foods.component';
import { GererContactsComponent } from './Compoents/gerer-contacts/gerer-contacts.component';
import { ProposComponent } from './Compoents/propos/propos.component';
import { ErreurComponent } from './Compoents/erreur/erreur.component';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'header',component:HeaderComponent},
  {path:'menu',component:MenuComponent},
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'propos',
    component: ProposComponent,
  },
  { path: 'foods/:id', component: DetailsFoodComponent },
  { path: 'gerer', component: GererFoodsComponent,
  canActivate: [authGuard, roleGuard],
    data: {
      role: 'ADMIN'
    } },
  { path: 'foodsupdate/:id', component: ModifFoodComponent,canActivate: [authGuard, roleGuard],
  data: {
    role: 'ADMIN'
  }  },
  { path: 'contacts', component: GererContactsComponent ,canActivate: [authGuard, roleGuard],
  data: {
    role: 'ADMIN'
  } },
  { path: 'search/:txt', component: HomeComponent },
  {path:'**',component:ErreurComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

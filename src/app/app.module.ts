import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Compoents/header/header.component';
import { HomeComponent } from './Compoents/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingDirective } from './Compoents/star-rating.directive';
import { DetailsFoodComponent } from './Compoents/details-food/details-food.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifFoodComponent } from './Compoents/modif-food/modif-food.component';
import { RegisterComponent } from './Compoents/register/register.component';
import { LoginComponent } from './Compoents/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuComponent } from './Compoents/menu/menu.component';
import { GestionfoodComponent } from './Compoents/gestionfood/gestionfood.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { GererFoodsComponent } from './Compoents/gerer-foods/gerer-foods.component';
import { GererContactsComponent } from './Compoents/gerer-contacts/gerer-contacts.component';
import { ProposComponent } from './Compoents/propos/propos.component';
import { FooterComponent } from './Compoents/footer/footer.component';
import { ErreurComponent } from './Compoents/erreur/erreur.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    StarRatingDirective,
    DetailsFoodComponent,
    ModifFoodComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    GestionfoodComponent,
    GererFoodsComponent,
    GererContactsComponent,
    ProposComponent,
    FooterComponent,
    ErreurComponent,

  ],

  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

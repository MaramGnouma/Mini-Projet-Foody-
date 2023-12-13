import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodServiceService } from 'src/app/Services/food-service.service';
import { Food } from 'src/app/Models/food';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailsFoodComponent } from '../details-food/details-food.component';
import { ContactservService } from 'src/app/Services/contactserv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods!: any[];
  searchText = '';
  selectedFood: any;
  message="";
  contacts: any[] = [];
  nouveauContact: any = {};
  contactForm!: FormGroup;
  constructor(private fb: FormBuilder, private foodService: FoodServiceService, private router: Router, private activatedRoute: ActivatedRoute, private contactService: ContactservService,
    private snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }


  ngOnInit(): void {
this.loadFoods();


  }
  search(query: string): void {
    this.foodService.searchFood(query).subscribe(
      (searchResults) => {
        console.log('Search results:', searchResults);
        this.foods = searchResults; // Update the foods array with search results
      },
      (error) => {
        console.error('Error searching for food:', error);
      }
    );

    // Si le texte de recherche est vide, naviguez vers la page d'accueil
    if (!query.trim()) {
      this.loadFoods();
    }
  }
  loadFoods(): void {
    this.foodService.getAllFoods().subscribe((foods) => this.foods = foods); // Corrected function name
  }

  getFoods() {
    this.foodService.getAllFoods().subscribe(data => {
      this.foods = data;
    });
  }

  getId(foodId: string): void {
    console.log('viewDetails - foodId', foodId);
    this.foodService.getFoodById(foodId).subscribe(
      (food) => {
        this.router.navigate(['/foods', foodId]);
      },
      (error) => {
        console.error(`Error loading food details for ID ${foodId}`, error);
      }
    );
  }
  ajouterContact(): void {
    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value).subscribe(
        (contact) => {
          console.log('Contact ajouté avec succès:', contact);

          // Réinitialiser les données du nouveau contact après l'ajout
          this.contactForm.reset();
          window.alert('Votre message a été bien envoyé. Merci pour votre message.');
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du contact:', error);
        }
      );
    } else {
      console.log('Le formulaire n\'est pas valide.');
    }
  }


}

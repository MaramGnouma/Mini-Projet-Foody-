import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/Models/food';
import { FoodServiceService } from 'src/app/Services/food-service.service';

@Component({
  selector: 'app-gestionfood',
  templateUrl: './gestionfood.component.html',
  styleUrls: ['./gestionfood.component.css']
})
export class GestionfoodComponent implements OnInit {
  foods!: any[];
  searchText = '';
  selectedFood: any;
  message=""
  constructor(private foodService: FoodServiceService, private router: Router,private activatedRoute: ActivatedRoute) {}


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
  addFood(newFood: any) {
    this.foodService.addFood(newFood).subscribe(() => {
      this.getFoods();
    });
  }

  modifier(foodId: string, food: Food): void {
    console.log('viewDetails - foodId', foodId);
    this.foodService.updateFood(foodId, food).subscribe(
      (food) => {
        this.router.navigate(['/foodsupdate', foodId]);
      },
      (error) => {
        console.error(`Error loading food details for ID ${foodId}`, error);
      }
    );
  }

  supprimer(id: string): void {
    // Utilisez window.confirm pour demander la confirmation
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?');

    if (isConfirmed) {
      this.foodService.deleteFood(id).subscribe(
        () => {
          console.log('Food item deleted successfully.');
          // Ajoutez une logique supplémentaire ici après la suppression réussie.
          this.getFoods(); // Rafraîchir automatiquement après la suppression
        },
        (error) => {
          console.error('Error deleting food item:', error);
          // Gérez l'erreur et affichez un message approprié à l'utilisateur.
        }
      );
    }
  }

}

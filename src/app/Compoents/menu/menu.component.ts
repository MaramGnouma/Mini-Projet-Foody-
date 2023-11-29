import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodServiceService } from 'src/app/Services/food-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
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
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/Models/food';
import { FoodServiceService } from 'src/app/Services/food-service.service';

@Component({
  selector: 'app-details-food',
  templateUrl: './details-food.component.html',
  styleUrls: ['./details-food.component.css']
})
export class DetailsFoodComponent implements OnInit {
  food: Food | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        // Utilisez subscribe pour gérer l'asynchronisme
        this.foodService.getFoodById(params['id']).subscribe(
          (result) => {
            this.food = result;
          },
          (error) => {
            console.error(`Error fetching food details for ID ${params['id']}`, error);
          }
        );
      }
    });
  }
}

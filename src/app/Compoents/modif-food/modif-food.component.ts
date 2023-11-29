import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/Models/food';
import { FoodServiceService } from 'src/app/Services/food-service.service';

@Component({
  selector: 'app-modif-food',
  templateUrl: './modif-food.component.html',
  styleUrls: ['./modif-food.component.css']
})
export class ModifFoodComponent implements OnInit {
  foodForm!: FormGroup;
  food: Food = {
    _id: '',
    //code: '',
    name: '',
    price: 0,
    favorite: false,
    stars: 0,
    image: '',
    origins: '',
    cookTime: ''
  }; // Assurez-vous que food est initialisé
  countries: string[] = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
    // Ajoutez plus de pays au besoin
  ];
  constructor(
    private formBuilder: FormBuilder,
    private foodService: FoodServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.foodService.getFoodById(params['id']).subscribe(
          (result) => {
            this.food = result;
            // Initialiser le formulaire après avoir récupéré les données
            this.initForm();
          },
          (error) => {
            console.error('Error fetching food by ID:', error);
          }
        );
      } else {
        this.initForm();
      }
    });
  }

  private initForm(): void {
    this.foodForm = this.formBuilder.group({
      code: [this.food._id || '', Validators.required],
      name: [this.food.name || '', Validators.required],
      price: [this.food.price || '', [Validators.required, Validators.min(0)]],
      favorite: [this.food.favorite ],
      stars: [this.food.stars || '', [Validators.required, Validators.min(0), Validators.max(5)]],
      image: [this.food.image || '', Validators.required],
      origins: [this.food.origins || '', Validators.required],
      cookTime: [this.food.cookTime || '', Validators.required],
    });
  }


  private initOriginsFormArray(origins: string[]): FormArray {
    return this.formBuilder.array(origins.map((origin) => this.formBuilder.control(origin)));
  }

  onSubmit(): void {
    if (this.foodForm.valid) {
      const updatedFood: Food = this.foodForm.value;

      this.foodService.updateFood(this.food._id, updatedFood).subscribe(
        () => {
          console.log('Food updated successfully.');
          this.router.navigate(['/gerer']);
        },
        (error) => {
          console.error('Error updating food:', error);
        }
      );
    }
  }
}

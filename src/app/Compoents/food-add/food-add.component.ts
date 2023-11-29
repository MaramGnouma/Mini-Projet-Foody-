import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Food } from 'src/app/Models/food';
import { FoodServiceService } from 'src/app/Services/food-service.service';


@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.css']
})
export class FoodAddComponent implements OnInit {
  foodForm!: FormGroup;
  auto = 1;
  countries: string[] = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
    // Ajoutez plus de pays au besoin
  ];

  constructor(private formBuilder: FormBuilder, private foodService: FoodServiceService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const generatedId = this.generateUniqueId();
    this.foodForm = this.formBuilder.group({
     // code: [generatedId, Validators.required], // Utilisez l'identifiant généré ici
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      favorite: [false],
      stars: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      image: ['', Validators.required],
      origins: ['', Validators.required],
      cookTime: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.foodForm.valid) {
      const newFood: Food = this.foodForm.value;

      this.foodService.addFood(newFood).subscribe(
        response => {
          console.log('Food added successfully', response);
          this.initializeForm();
          this.router.navigate(['/gerer']);
        },
        error => {
          console.error('Error adding food', error);
        }
      );
    }
  }

  generateUniqueId(): string {
    // Utilisez une logique pour générer un ID unique, par exemple un timestamp
    return new Date().getTime().toString();
  }
}

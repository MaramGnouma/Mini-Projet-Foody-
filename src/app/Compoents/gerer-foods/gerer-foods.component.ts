import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Food } from 'src/app/Models/food';
import { FoodServiceService } from 'src/app/Services/food-service.service';
import axios, { AxiosError } from 'axios';

@Component({
  selector: 'app-gerer-foods',
  templateUrl: './gerer-foods.component.html',
  styleUrls: ['./gerer-foods.component.css']
})
export class GererFoodsComponent implements OnInit {
  foods!: any[];
  searchText = '';
  foodForm!: FormGroup;
  countries: string[] = ['Algeria','Andorra','France','Italy','United States','SouthKorea','Tunisia','Algeria','Morocco','Egypt',];
  types: string[] = ['Déjeuner', 'Dîner', 'Dessert', 'Petit-déjeuner'];
  selectedFile: File | null = null;

  constructor(
    private foodService: FoodServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadFoods();
    this.initializeForm();
  }


  initializeForm(): void {
    this.foodForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      favorite: [false],
      stars: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      image: [null, Validators.required],
      origins: ['', Validators.required],
      cookTime: ['', [Validators.required,]],
      type: ['', Validators.required],
    });
  }

  isnomPattern(){
    return this.foodForm.controls['name'].errors?.['name'] &&
    this.foodForm.controls['name'].touched;
    }
    isnomrequired(){
      return this.foodForm.controls['name'].errors?.['name'] &&
    this.foodForm.controls['name'].touched;
    }


    isprixPattern(){
      return this.foodForm.controls['price'].errors?.['pattern'] &&
      this.foodForm.controls['price'].touched;
      }
      isprixrequired(){
        return this.foodForm.controls['price'].errors?.['required'] &&
      this.foodForm.controls['price'].touched;
      }
      iscooktimerequired(){
        return this.foodForm.controls['cookTime'].errors?.['required'] &&
      this.foodForm.controls['cookTime'].touched;
      }
      iscookitimePattern(){
        return this.foodForm.controls['cookTime'].errors?.['pattern'] &&
        this.foodForm.controls['cookTime'].touched;
        }
      isstartrequired(){
        return this.foodForm.controls['stars'].errors?.['required'] &&
      this.foodForm.controls['stars'].touched;
      }
      isphotorequired(){
        return this.foodForm.controls['image'].errors?.['required'] &&
      this.foodForm.controls['image'].touched;
      }


  async onSubmit(): Promise<void> {
    if (this.foodForm.valid && this.selectedFile) {
      const form = new FormData();
      form.append('file', this.selectedFile);
      form.append('upload_preset', 'maramgnouma');  // Cloudinary upload preset

      try {
        // Envoyer le fichier à Cloudinary
        const cloudinaryResponse = await axios.post('http://api.cloudinary.com/v1_1/deezublk9/upload', form);
        const imageUrl = cloudinaryResponse.data.secure_url;
        console.log(imageUrl);

        // Continuer avec le reste de la soumission du formulaire
        const newFood: Food = { ...this.foodForm.value, image: imageUrl };
        this.foodService.addFood(newFood).subscribe(
          response => {
            console.log('Food added successfully', response);
            this.initializeForm();
            this.router.navigate(['/gerer']);
            this.loadFoods();
          },
          error => {
            console.error('Error adding food', error);
          }
        );
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      }
    }
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
      this.loadFoods();
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
          this.loadFoods(); // Rafraîchir automatiquement après la suppression
        },
        (error) => {
          console.error('Error deleting food item:', error);
          // Gérez l'erreur et affichez un message approprié à l'utilisateur.
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Food } from 'src/app/Models/food';
import { FoodServiceService } from 'src/app/Services/food-service.service';

@Component({
  selector: 'app-modif-food',
  templateUrl: './modif-food.component.html',
  styleUrls: ['./modif-food.component.css']
})
export class ModifFoodComponent implements OnInit {
  foodForm!: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  types: string[] = ['Déjeuner', 'Dîner', 'Dessert', 'Petit-déjeuner'];
  food: Food = {
    _id: '',
    name: '',
    price: 0,
    favorite: false,
    stars: 0,
    image: '',
    origins: '',
    cookTime: '',
    type: ''
  };
    countries: string[] = ['Algeria','Andorra','France','Italy','United States','SouthKorea','Tunisia','Algeria','Morocco','Egypt',];


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
      price: [this.food.price || 0, [Validators.required, Validators.min(0)]],
      favorite: [this.food.favorite],
      stars: [this.food.stars || 0, [Validators.required, Validators.min(0), Validators.max(5)]],
      image: [this.food.image || '', Validators.required],
      origins: [this.food.origins || '', Validators.required],
      cookTime: [this.food.cookTime || '', Validators.required],
      type: [this.food.type || '', Validators.required],
    });
  }
  async onSubmit(): Promise<void> {
    if (this.foodForm.valid) {
      try {
        if (this.selectedFile) {
          const form = new FormData();
          form.append('file', this.selectedFile);
          form.append('upload_preset', 'maramgnouma');  // Cloudinary upload preset
          const cloudinaryResponse = await axios.post('http://api.cloudinary.com/v1_1/deezublk9/upload', form);
          const imageUrl = cloudinaryResponse.data.secure_url;

          // Set the imageUrl in the form
          this.foodForm.patchValue({ image: imageUrl });
        }

        const updatedFood: Food = { ...this.foodForm.value };
        await this.foodService.updateFood(this.food._id, updatedFood).toPromise();
        console.log('Food updated successfully.');

        // Update local data
        this.food = updatedFood;

        this.router.navigate(['/gerer']);
      } catch (error) {
        console.error('Error updating food:', error);
      }
    }
  }

/*
  async onSubmit(): Promise<void> {
    if (this.foodForm.valid && this.selectedFile) {
      const form = new FormData();
      form.append('file', this.selectedFile);
      form.append('upload_preset', 'maramgnouma');  // Cloudinary upload preset

      try {
        //const cloudinaryResponse = await axios.post('http://api.cloudinary.com/v1_1/deezublk9/upload', form);
        //const imageUrl = cloudinaryResponse.data.secure_url;

       //const updatedFood: Food = { };
        this.foodService.updateFood(this.food._id, this.foodForm).subscribe(
          (response) => {
            console.log('Food updated successfully.', response);

            // Update local data
            this.food = this.foodForm;

            this.router.navigate(['/gerer']);
          },
          (error) => {
            console.error('Error updating food:', error);
          }
        );
                 }         catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      }
    }
  }
*/
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    // Lire le fichier sélectionné et mettre à jour l'URL de l'image
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);

      // Trigger (input) event programmatically
      const inputElement = document.getElementById('image') as HTMLInputElement;
      if (inputElement) {
        const inputEvent = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(inputEvent);
      }
    }
  }


}

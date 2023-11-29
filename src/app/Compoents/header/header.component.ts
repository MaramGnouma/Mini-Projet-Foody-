// header.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/Models/food';
import { FoodServiceService } from 'src/app/Services/food-service.service';
import { Emitters } from 'src/app/emmiters/emmiter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchText = '';
  foods: Food[] = [];
  message=""
  authenticated=true;

  constructor(private foodService: FoodServiceService, private activatedRoute: ActivatedRoute,private http:HttpClient) {}

  ngOnInit(): void {
    //Emitters
    Emitters.authEmitter.subscribe((auth:boolean)=>{
      this.authenticated=auth;
    })

    this.http.get('http://localhost:5000/api/user', {
      withCredentials: true
    }).subscribe(
      (res: any) => {
        this.message = `${res.name}`;
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        this.message = 'you are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );

    this.activatedRoute.params.subscribe((params) => {
      if (params['searchText']) {
        this.searchText = params['searchText'];
        this.search(this.searchText);
      } else {
        this.loadFoods(); // Corrected function name
      }
    });
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
  }

  loadFoods(): void {
    this.foodService.getAllFoods().subscribe((foods) => this.foods = foods); // Corrected function name
  }
  logout():void{
    this.http.post('http://localhost:5000/api/logout',{},{
      withCredentials:true
    }).subscribe(()=>this.authenticated=false)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Food } from '../Models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getAllFoods(): Observable<any> {
    return this.http.get(`${this.apiUrl}/foods`);
  }
  getFoodById(id: string): Observable<any> {
    return this.http.get<Food>(`${this.apiUrl}/foods/${id}`)

  }

  addFood(food: any): Observable<any> {
    // Example of sending JSON data in Angular
    return this.http.post('http://localhost:5000/foods', food, { headers: { 'Content-Type': 'application/json' } });

  }


  updateFood(code: string, food: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/foods/${code}`, food);
  }

  deleteFood(code: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/foods/${code}`);
  }
  searchFood(query: string): Observable<Food[]> {
    const url = `${this.apiUrl}/search/${query}`;
    return this.http.get<Food[]>(url);
  }
}


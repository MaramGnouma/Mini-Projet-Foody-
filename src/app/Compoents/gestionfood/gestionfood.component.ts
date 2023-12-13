import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/Models/food';
import { FoodServiceService } from 'src/app/Services/food-service.service';
import { Emitters } from 'src/app/emmiters/emmiter';

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
  authenticated: boolean;

  constructor(private router: Router,private http:HttpClient) {}


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
  }



  logout():void{
    const confirmation = confirm('Do you want to logout');
    if(confirmation) {
      localStorage.removeItem('token');
      this.http.post('http://localhost:5000/api/logout',{},{
      withCredentials:true
    }).subscribe(()=>this.authenticated=false)
    this.router.navigate(['/login']);
    }

  }

}

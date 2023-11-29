import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!:FormGroup;
  constructor(private formBuilder:FormBuilder,private httpClient:HttpClient,private router:Router) {
  }

  ngOnInit():void{
    this.form=this.formBuilder.group({
      name:"",
      email:"",
      password:""
    })
  }

  validateEmail=(email:any)=>{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(email.match(validRegex)){
      return true;
    }
    else
      return false;
  }

  submit():void{
    let user=this.form.getRawValue();
    console.log(user);
    if(user.name=="" || user.password=="" || user.email==""){
      Swal.fire({
        icon:'error',
        title:`Oops...`,
        text:'Please fill all fields'
        });
    }
    else if(!this.validateEmail(user.email)){
      Swal.fire({
        icon:'error',
        title:`Oops...`,
        text:'Please enter a valid email'
        });
    }
    else{
      this.httpClient.post("http://localhost:5000/api/register", user, { withCredentials: true })
  .subscribe(
    () => this.router.navigate(['/login']),
    (err) => {
      console.error(err);  // Log the error to the console for debugging
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message || 'An error occurred during registration.',
      });
    }
  );

    }
  }
}

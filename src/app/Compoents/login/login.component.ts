import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  private isAuthenticated = false;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  validateEmail = (email: any): boolean => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return email.match(validRegex) ? true : false;
  };

  submit(): void {
    const user = this.form.getRawValue();

    if (user.email === '' || user.password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all fields'
      });
    } else if (!this.validateEmail(user.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email'
      });
    } else {
      this.httpClient.post("http://localhost:5000/api/login", user, { withCredentials: true })
        .subscribe(
          () => this.router.navigate(['/gerer']),

          (err) => {
            console.error(err);  // Log the error to the console for debugging
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.message || 'An error occurred during login.',
            });

          }
        );
    }
  }
}

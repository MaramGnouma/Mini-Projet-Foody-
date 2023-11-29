// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticatedUser: { username: string, password: string } | null = null;

  constructor(private httpClient: HttpClient) {}

  // Simulate login. In a real application, this would make an HTTP request to your authentication backend.
  login(username: string, password: string): Observable<boolean> {
    // Replace this with your actual authentication logic
    return this.httpClient.post<boolean>('http://localhost:5000/api/login', { username, password });
  }

  // Simulate logout
  logout(): void {
    // Replace this with your actual logout logic
    this.authenticatedUser = null;
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.authenticatedUser;
  }

  // Get a valid user based on username and password
  private getValidUser(username: string, password: string): Observable<{ username: string, password: string } | null> {
    // Replace this with your actual user validation logic
    return this.httpClient.post<{ username: string, password: string } | null>('http://localhost:5000/api/user', { withCredentials: true });
  }
}

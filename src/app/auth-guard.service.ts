import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';  // Replace with your actual API endpoint

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };

    return this.httpClient.post<boolean>(`${this.apiUrl}/login`, loginData);
  }

  logout(): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/logout`, {});
  }

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<any>(`${this.apiUrl}/user`);
  }
}

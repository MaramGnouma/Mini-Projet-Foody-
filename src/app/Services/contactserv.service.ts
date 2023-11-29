import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactservService {
  private apiUrl = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contacts`);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contacts`, contact);
  }
}

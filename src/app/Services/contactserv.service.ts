// ContactservService

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactservService {
  private apiUrl = 'http://localhost:5000/contacts'; // Remplacez par l'URL de votre serveur

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getContactById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, contact);
  }

  updateContact(id: string, contact: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

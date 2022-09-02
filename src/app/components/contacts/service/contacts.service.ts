import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../store/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private baseURL: string = "http://localhost:3000/contacts";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  load(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseURL);
  }

  loadPage(currentPage: number, limit: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseURL}?_page=${currentPage}&_limit=${limit}`);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.patch<Contact>(`${this.baseURL}/${contact.id}`, contact, this.httpOptions);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.baseURL, contact, this.httpOptions);
  }
  
  deleteContact(id: number): Observable<object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../store/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  load(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:3000/contacts');
  }

  loadPage(currentPage: number, limit: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`http://localhost:3000/contacts?_page=${currentPage}&_limit=${limit}`);
  }
}
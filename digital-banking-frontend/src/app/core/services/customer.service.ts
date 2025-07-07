import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly API_URL = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API_URL);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.API_URL}/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.API_URL, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.API_URL}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  searchCustomers(keyword: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.API_URL}/search`, {
      params: { keyword }
    });
  }
}
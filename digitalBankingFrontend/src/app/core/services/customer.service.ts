import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomerDTO } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/customers`;

  // Get all customers
  getAllCustomers(): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(this.baseUrl);
  }

  // Get customer by ID
  getCustomerById(id: number): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(`${this.baseUrl}/${id}`);
  }

  // Create new customer
  createCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    return this.http.post<CustomerDTO>(this.baseUrl, customer);
  }

  // Update existing customer
  updateCustomer(id: number, customer: CustomerDTO): Observable<CustomerDTO> {
    return this.http.put<CustomerDTO>(`${this.baseUrl}/${id}`, customer);
  }

  // Delete customer
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Search customers
  searchCustomers(keyword: string): Observable<CustomerDTO[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<CustomerDTO[]>(`${this.baseUrl}/search`, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly API_URL = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API_URL).pipe(
      catchError(error => {
        console.error('Error fetching customers:', error);
        return of(this.getMockCustomers());
      })
    );
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching customer:', error);
        return of(this.getMockCustomers()[0]);
      })
    );
  }

  createCustomer(customerData: Partial<Customer>): Observable<Customer> {
    return this.http.post<Customer>(this.API_URL, customerData).pipe(
      catchError(error => {
        console.error('Error creating customer:', error);
        throw error;
      })
    );
  }

  updateCustomer(id: number, customerData: Partial<Customer>): Observable<Customer> {
    return this.http.put<Customer>(`${this.API_URL}/${id}`, customerData).pipe(
      catchError(error => {
        console.error('Error updating customer:', error);
        throw error;
      })
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting customer:', error);
        throw error;
      })
    );
  }

  private getMockCustomers(): Customer[] {
    return [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        address: '123 Main St, City, State 12345',
        dateOfBirth: new Date('1990-01-15'),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date()
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '+1987654321',
        address: '456 Oak Ave, City, State 67890',
        dateOfBirth: new Date('1985-05-20'),
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date()
      }
    ];
  }
}

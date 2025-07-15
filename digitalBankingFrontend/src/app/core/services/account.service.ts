import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  BankAccountDTO,
  AccountHistoryDTO,
  DebitRequest,
  CreditRequest,
  TransferRequest,
} from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/accounts`;

  // Get all accounts
  getAllAccounts(): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(this.baseUrl);
  }

  // Get account by ID
  getAccountById(id: string): Observable<BankAccountDTO> {
    return this.http.get<BankAccountDTO>(`${this.baseUrl}/${id}`);
  }

  // Get accounts by customer ID
  getAccountsByCustomerId(customerId: number): Observable<BankAccountDTO[]> {
    const params = new HttpParams().set('customerId', customerId.toString());
    return this.http.get<BankAccountDTO[]>(`${this.baseUrl}/customer`, {
      params,
    });
  }

  // Create new account
  createAccount(account: Partial<BankAccountDTO>): Observable<BankAccountDTO> {
    return this.http.post<BankAccountDTO>(this.baseUrl, account);
  }

  // Update account
  updateAccount(
    id: string,
    account: Partial<BankAccountDTO>
  ): Observable<BankAccountDTO> {
    return this.http.put<BankAccountDTO>(`${this.baseUrl}/${id}`, account);
  }

  // Delete account
  deleteAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Credit account
  creditAccount(request: CreditRequest): Observable<BankAccountDTO> {
    return this.http.post<BankAccountDTO>(`${this.baseUrl}/credit`, request);
  }

  // Debit account
  debitAccount(request: DebitRequest): Observable<BankAccountDTO> {
    return this.http.post<BankAccountDTO>(`${this.baseUrl}/debit`, request);
  }

  // Transfer between accounts
  transferFunds(request: TransferRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/transfer`, request);
  }

  // Get account history
  getAccountHistory(
    accountId: string,
    page: number = 0,
    size: number = 10
  ): Observable<AccountHistoryDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<AccountHistoryDTO>(
      `${this.baseUrl}/${accountId}/history`,
      { params }
    );
  }
}

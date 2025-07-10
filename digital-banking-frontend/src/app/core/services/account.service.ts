import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Account,
  BankAccount,
  CurrentAccount,
  SavingAccount,
  AccountHistory,
  TransferRequest,
  DebitRequest,
  CreditRequest,
  Transaction,
  AccountBalance
} from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly API_URL = 'http://localhost:8080/api/accounts';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(this.API_URL).pipe(
      catchError(error => {
        console.error('Error fetching accounts:', error);
        // Return mock data for development
        return of(this.getMockAccounts());
      })
    );
  }

  getAccount(id: number): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching account:', error);
        return of(this.getMockAccounts()[0]);
      })
    );
  }

  getCurrentAccounts(): Observable<CurrentAccount[]> {
    return this.http.get<CurrentAccount[]>(`${this.API_URL}/current`).pipe(
      catchError(error => {
        console.error('Error fetching current accounts:', error);
        return of([]);
      })
    );
  }

  getSavingAccounts(): Observable<SavingAccount[]> {
    return this.http.get<SavingAccount[]>(`${this.API_URL}/savings`).pipe(
      catchError(error => {
        console.error('Error fetching saving accounts:', error);
        return of([]);
      })
    );
  }

  getAccountHistory(accountId: number, page: number = 0, size: number = 10): Observable<AccountHistory> {
    return this.http.get<AccountHistory>(`${this.API_URL}/${accountId}/history?page=${page}&size=${size}`).pipe(
      catchError(error => {
        console.error('Error fetching account history:', error);
        return of(this.getMockAccountHistory(accountId));
      })
    );
  }

  getAccountBalance(accountId: number): Observable<AccountBalance> {
    return this.http.get<AccountBalance>(`${this.API_URL}/${accountId}/balance`).pipe(
      catchError(error => {
        console.error('Error fetching account balance:', error);
        return of({
          accountId,
          balance: 1000,
          availableBalance: 1000,
          currency: 'USD',
          lastUpdated: new Date()
        });
      })
    );
  }

  transfer(transferRequest: TransferRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.API_URL}/transfer`, transferRequest).pipe(
      catchError(error => {
        console.error('Error processing transfer:', error);
        throw error;
      })
    );
  }

  debit(debitRequest: DebitRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.API_URL}/debit`, debitRequest).pipe(
      catchError(error => {
        console.error('Error processing debit:', error);
        throw error;
      })
    );
  }

  credit(creditRequest: CreditRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.API_URL}/credit`, creditRequest).pipe(
      catchError(error => {
        console.error('Error processing credit:', error);
        throw error;
      })
    );
  }

  createAccount(accountData: Partial<BankAccount>): Observable<BankAccount> {
    return this.http.post<BankAccount>(this.API_URL, accountData).pipe(
      catchError(error => {
        console.error('Error creating account:', error);
        throw error;
      })
    );
  }

  updateAccount(id: number, accountData: Partial<BankAccount>): Observable<BankAccount> {
    return this.http.put<BankAccount>(`${this.API_URL}/${id}`, accountData).pipe(
      catchError(error => {
        console.error('Error updating account:', error);
        throw error;
      })
    );
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting account:', error);
        throw error;
      })
    );
  }

  // Mock data for development
  private getMockAccounts(): BankAccount[] {
    return [
      {
        id: 1,
        accountNumber: 'ACC-001-2024',
        accountType: 'CHECKING',
        balance: 2500.75,
        currency: 'USD',
        isActive: true,
        customerId: 1,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date()
      },
      {
        id: 2,
        accountNumber: 'ACC-002-2024',
        accountType: 'SAVINGS',
        balance: 15000.00,
        currency: 'USD',
        isActive: true,
        customerId: 1,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date()
      }
    ];
  }

  private getMockAccountHistory(accountId: number): AccountHistory {
    return {
      accountId,
      transactions: [
        {
          id: 1,
          accountId,
          type: 'DEPOSIT',
          amount: 1000,
          description: 'Salary deposit',
          timestamp: new Date(),
          balance: 2500.75
        },
        {
          id: 2,
          accountId,
          type: 'WITHDRAWAL',
          amount: 200,
          description: 'ATM withdrawal',
          timestamp: new Date(Date.now() - 86400000),
          balance: 1500.75
        }
      ],
      totalTransactions: 2,
      currentPage: 0,
      totalPages: 1
    };
  }
}

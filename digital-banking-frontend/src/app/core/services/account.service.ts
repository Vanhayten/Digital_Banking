import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  BankAccount, 
  CurrentAccount, 
  SavingAccount, 
  AccountHistory,
  TransferRequest,
  DebitRequest,
  CreditRequest 
} from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly API_URL = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(this.API_URL);
  }

  getAccount(id: string): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${this.API_URL}/${id}`);
  }

  createCurrentAccount(initialBalance: number, overDraft: number, customerId: number): Observable<CurrentAccount> {
    return this.http.post<CurrentAccount>(`${this.API_URL}/current`, null, {
      params: {
        initialBalance: initialBalance.toString(),
        overDraft: overDraft.toString(),
        customerId: customerId.toString()
      }
    });
  }

  createSavingAccount(initialBalance: number, interestRate: number, customerId: number): Observable<SavingAccount> {
    return this.http.post<SavingAccount>(`${this.API_URL}/saving`, null, {
      params: {
        initialBalance: initialBalance.toString(),
        interestRate: interestRate.toString(),
        customerId: customerId.toString()
      }
    });
  }

  debit(request: DebitRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/debit`, request);
  }

  credit(request: CreditRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/credit`, request);
  }

  transfer(request: TransferRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/transfer`, request);
  }

  getAccountHistory(accountId: string, page: number = 0, size: number = 5): Observable<AccountHistory> {
    return this.http.get<AccountHistory>(`${this.API_URL}/${accountId}/history`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }
}
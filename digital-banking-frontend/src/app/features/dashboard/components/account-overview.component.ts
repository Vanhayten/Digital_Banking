import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountService } from '../../../core/services/account.service';
import { Account, BankAccount } from '../../../core/models/account.model';

@Component({
  selector: 'app-account-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="account-overview">
      <h2>Account Overview</h2>

      <div *ngIf="isLoading" class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Loading accounts...</p>
      </div>

      <div *ngIf="!isLoading && accounts.length === 0" class="no-accounts">
        <mat-icon>account_balance</mat-icon>
        <h3>No Accounts Found</h3>
        <p>You don't have any accounts yet.</p>
        <button mat-raised-button color="primary" (click)="createAccount()">
          Create Account
        </button>
      </div>

      <div *ngIf="!isLoading && accounts.length > 0" class="accounts-grid">
        <mat-card *ngFor="let account of accounts" class="account-card card-hover">
          <mat-card-header>
            <mat-card-title>{{ account.accountType | titlecase }} Account</mat-card-title>
            <mat-card-subtitle>{{ account.accountNumber }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div class="balance-section">
              <span class="balance-label">Current Balance</span>
              <span class="balance-amount" 
                    [ngClass]="{'balance-positive': account.balance >= 0, 'balance-negative': account.balance < 0}">
                {{ account.balance | currency:account.currency }}
              </span>
            </div>

            <div class="account-details">
              <div class="detail-item">
                <span class="label">Status:</span>
                <span class="value" [ngClass]="{'active': account.isActive, 'inactive': !account.isActive}">
                  {{ account.isActive ? 'Active' : 'Inactive' }}
                </span>
              </div>
              <div class="detail-item">
                <span class="label">Currency:</span>
                <span class="value">{{ account.currency }}</span>
              </div>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <button mat-button color="primary" (click)="viewTransactions(account.id)">
              <mat-icon>history</mat-icon>
              Transactions
            </button>
            <button mat-button (click)="viewDetails(account.id)">
              <mat-icon>visibility</mat-icon>
              Details
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <div *ngIf="error" class="error-message">
        <mat-icon>error</mat-icon>
        <p>{{ error }}</p>
        <button mat-button color="primary" (click)="loadAccounts()">
          <mat-icon>refresh</mat-icon>
          Retry
        </button>
      </div>
    </div>
  `,
  styles: [`
    .account-overview {
      padding: 20px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
    }

    .no-accounts {
      text-align: center;
      padding: 40px;
    }

    .no-accounts mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      color: #666;
    }

    .accounts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .account-card {
      min-height: 200px;
    }

    .balance-section {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }

    .balance-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 4px;
    }

    .balance-amount {
      font-size: 24px;
      font-weight: bold;
    }

    .account-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
    }

    .label {
      font-weight: 500;
      color: #666;
    }

    .value.active {
      color: #4caf50;
    }

    .value.inactive {
      color: #f44336;
    }

    .error-message {
      text-align: center;
      padding: 40px;
      color: #f44336;
    }

    .error-message mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
    }

    mat-card-actions {
      display: flex;
      gap: 8px;
    }
  `]
})
export class AccountOverviewComponent implements OnInit {
  private accountService = inject(AccountService);

  accounts: Account[] = [];
  isLoading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.isLoading = true;
    this.error = null;

    this.accountService.getAccounts().subscribe({
      next: (bankAccounts: BankAccount[]) => {
        // Convert BankAccount[] to Account[] with proper mapping
        this.accounts = bankAccounts.map(bankAccount => this.mapBankAccountToAccount(bankAccount));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
        this.error = 'Failed to load accounts. Please try again.';
        this.isLoading = false;
      }
    });
  }

  private mapBankAccountToAccount(bankAccount: BankAccount): Account {
    return {
      id: bankAccount.id,
      accountNumber: bankAccount.accountNumber,
      accountType: bankAccount.accountType,
      balance: bankAccount.balance,
      currency: bankAccount.currency,
      isActive: bankAccount.isActive,
      customer: {
        id: bankAccount.customerId,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      createdAt: bankAccount.createdAt,
      updatedAt: bankAccount.updatedAt
    };
  }

  createAccount(): void {
    // Navigate to account creation
    console.log('Navigate to create account');
  }

  viewTransactions(accountId: number): void {
    console.log('View transactions for account:', accountId);
  }

  viewDetails(accountId: number): void {
    console.log('View details for account:', accountId);
  }
}

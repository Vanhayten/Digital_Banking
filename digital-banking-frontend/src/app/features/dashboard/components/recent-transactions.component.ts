import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

export interface Transaction {
  id: string;
  type: 'DEBIT' | 'CREDIT';
  amount: number;
  description: string;
  date: Date;
  accountNumber: string;
  balance: number;
}

@Component({
  selector: 'app-recent-transactions',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  template: `
    <mat-card class="recent-transactions-card">
      <mat-card-header>
        <mat-card-title>Recent Transactions</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <div *ngIf="loading" class="loading-container">
          <mat-spinner diameter="40"></mat-spinner>
          <p>Loading transactions...</p>
        </div>

        <div *ngIf="!loading && transactions.length > 0">
          <mat-list>
            <mat-list-item *ngFor="let transaction of transactions; trackBy: trackByTransactionId">
              <mat-icon matListItemIcon [ngClass]="getTransactionIconClass(transaction.type)">
                {{ getTransactionIcon(transaction.type) }}
              </mat-icon>

              <div matListItemTitle>{{ transaction.description }}</div>
              <div matListItemLine>
                {{ transaction.date | date:'short' }} • Account: {{ transaction.accountNumber }}
              </div>

              <div matListItemMeta class="transaction-amount" 
                   [ngClass]="getAmountClass(transaction.type)">
                {{ transaction.type === 'CREDIT' ? '+' : '-' }}{{ transaction.amount | currency }}
              </div>
            </mat-list-item>
          </mat-list>
        </div>

        <div *ngIf="!loading && transactions.length === 0" class="empty-state">
          <mat-icon class="empty-icon">receipt_long</mat-icon>
          <p>No recent transactions found</p>
          <button mat-raised-button color="primary" routerLink="/transactions">
            View All Transactions
          </button>
        </div>
      </mat-card-content>

      <mat-card-actions *ngIf="transactions.length > 0">
        <button mat-button routerLink="/transactions">View All</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .recent-transactions-card {
      margin: 16px 0;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px;
    }

    .loading-container p {
      margin-top: 16px;
      color: rgba(0, 0, 0, 0.6);
    }

    .transaction-amount {
      font-weight: 500;
      min-width: 80px;
      text-align: right;
    }

    .credit-amount {
      color: #4caf50;
    }

    .debit-amount {
      color: #f44336;
    }

    .credit-icon {
      color: #4caf50;
    }

    .debit-icon {
      color: #f44336;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px;
      text-align: center;
    }

    .empty-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: rgba(0, 0, 0, 0.3);
      margin-bottom: 16px;
    }

    .empty-state p {
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 16px;
    }

    mat-list-item {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    mat-list-item:last-child {
      border-bottom: none;
    }
  `]
})
export class RecentTransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadRecentTransactions();
  }

  private loadRecentTransactions(): void {
    // Simulate API call
    setTimeout(() => {
      this.transactions = this.getMockTransactions();
      this.loading = false;
    }, 1000);
  }

  private getMockTransactions(): Transaction[] {
    return [
      {
        id: '1',
        type: 'DEBIT',
        amount: 150.00,
        description: 'Grocery Store Purchase',
        date: new Date('2024-01-15T10:30:00'),
        accountNumber: '****1234',
        balance: 2850.00
      },
      {
        id: '2',
        type: 'CREDIT',
        amount: 2500.00,
        description: 'Salary Deposit',
        date: new Date('2024-01-14T09:00:00'),
        accountNumber: '****1234',
        balance: 3000.00
      },
      {
        id: '3',
        type: 'DEBIT',
        amount: 75.50,
        description: 'Gas Station',
        date: new Date('2024-01-13T16:45:00'),
        accountNumber: '****1234',
        balance: 500.00
      },
      {
        id: '4',
        type: 'DEBIT',
        amount: 1200.00,
        description: 'Rent Payment',
        date: new Date('2024-01-12T08:00:00'),
        accountNumber: '****1234',
        balance: 575.50
      },
      {
        id: '5',
        type: 'CREDIT',
        amount: 50.00,
        description: 'Cashback Reward',
        date: new Date('2024-01-11T14:20:00'),
        accountNumber: '****1234',
        balance: 1775.50
      }
    ];
  }

  getTransactionIcon(type: string): string {
    return type === 'CREDIT' ? 'arrow_downward' : 'arrow_upward';
  }

  getTransactionIconClass(type: string): string {
    return type === 'CREDIT' ? 'credit-icon' : 'debit-icon';
  }

  getAmountClass(type: string): string {
    return type === 'CREDIT' ? 'credit-amount' : 'debit-amount';
  }

  trackByTransactionId(index: number, transaction: Transaction): string {
    return transaction.id;
  }
}
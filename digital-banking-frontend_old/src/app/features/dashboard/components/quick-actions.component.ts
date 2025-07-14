import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  template: `
    <mat-card class="quick-actions-card">
      <mat-card-header>
        <mat-card-title class="text-lg font-semibold">Quick Actions</mat-card-title>
        <mat-card-subtitle>Common banking operations</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content class="p-0">
        <mat-list>
          <mat-list-item *ngFor="let action of quickActions" 
                         class="action-item"
                         [routerLink]="action.route">
            <div class="flex items-center w-full p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div class="action-icon mr-4" [ngClass]="'bg-' + action.color + '-100'">
                <mat-icon [ngClass]="'text-' + action.color + '-600'">{{ action.icon }}</mat-icon>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{ action.title }}</h3>
                <p class="text-sm text-gray-500">{{ action.description }}</p>
              </div>
              <mat-icon class="text-gray-400">chevron_right</mat-icon>
            </div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .quick-actions-card {
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .action-item {
      border-bottom: 1px solid #f1f5f9;
      padding: 0 !important;
    }

    .action-item:last-child {
      border-bottom: none;
    }

    .action-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bg-blue-100 { background-color: #dbeafe; }
    .bg-green-100 { background-color: #dcfce7; }
    .bg-purple-100 { background-color: #e9d5ff; }
    .bg-orange-100 { background-color: #fed7aa; }

    .text-blue-600 { color: #2563eb; }
    .text-green-600 { color: #059669; }
    .text-purple-600 { color: #7c3aed; }
    .text-orange-600 { color: #d97706; }
  `]
})
export class QuickActionsComponent {
  quickActions: QuickAction[] = [
    {
      title: 'Add New Customer',
      description: 'Register a new customer',
      icon: 'person_add',
      route: '/customers/new',
      color: 'blue'
    },
    {
      title: 'Create Account',
      description: 'Open new bank account',
      icon: 'account_balance_wallet',
      route: '/accounts/new',
      color: 'green'
    },
    {
      title: 'Transfer Money',
      description: 'Transfer between accounts',
      icon: 'swap_horiz',
      route: '/accounts/transfer',
      color: 'purple'
    },
    {
      title: 'View Reports',
      description: 'Generate banking reports',
      icon: 'analytics',
      route: '/reports',
      color: 'orange'
    }
  ];
}
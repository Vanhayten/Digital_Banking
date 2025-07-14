import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService, AuthStatus } from '../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule
  ],
  template: `
    <mat-toolbar color="primary" class="banking-header">
      <div class="header-content">
        <!-- Logo and Brand -->
        <div class="brand-section">
          <button mat-icon-button routerLink="/" class="logo-button">
            <mat-icon>account_balance</mat-icon>
          </button>
          <span class="brand-name" routerLink="/">SecureBank</span>
        </div>

        <!-- Navigation Menu -->
        <nav class="nav-menu" *ngIf="isAuthenticated$ | async">
          <button mat-button routerLink="/dashboard" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon>
            Dashboard
          </button>
          <button mat-button routerLink="/accounts" routerLinkActive="active">
            <mat-icon>account_balance_wallet</mat-icon>
            Accounts
          </button>
          <button mat-button routerLink="/customers" routerLinkActive="active">
            <mat-icon>people</mat-icon>
            Customers
          </button>
          <button mat-button routerLink="/transactions" routerLinkActive="active">
            <mat-icon>receipt_long</mat-icon>
            Transactions
          </button>
        </nav>

        <!-- User Actions -->
        <div class="user-actions">
          <div *ngIf="isAuthenticated$ | async; else loginSection">
            <!-- Notifications -->
            <button mat-icon-button [matMenuTriggerFor]="notificationMenu">
              <mat-icon matBadge="3" matBadgeColor="warn">notifications</mat-icon>
            </button>

            <!-- User Menu -->
            <button mat-icon-button [matMenuTriggerFor]="userMenu">
              <mat-icon>account_circle</mat-icon>
            </button>
          </div>

          <ng-template #loginSection>
            <button mat-button routerLink="/login">
              <mat-icon>login</mat-icon>
              Login
            </button>
            <button mat-raised-button color="accent" routerLink="/register">
              Register
            </button>
          </ng-template>
        </div>
      </div>
    </mat-toolbar>

    <!-- Notification Menu -->
    <mat-menu #notificationMenu="matMenu" class="notification-menu">
      <div class="menu-header">
        <h3>Notifications</h3>
      </div>
      <mat-divider></mat-divider>
      <button mat-menu-item>
        <mat-icon>info</mat-icon>
        <span>New transaction processed</span>
      </button>
      <button mat-menu-item>
        <mat-icon>warning</mat-icon>
        <span>Account balance low</span>
      </button>
      <button mat-menu-item>
        <mat-icon>security</mat-icon>
        <span>Security alert</span>
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item class="view-all">
        <span>View All Notifications</span>
      </button>
    </mat-menu>

    <!-- User Menu -->
    <mat-menu #userMenu="matMenu" class="user-menu">
      <div class="menu-header">
        <div class="user-info">
          <mat-icon>account_circle</mat-icon>
          <div>
            <div class="user-name">{{ currentUser?.name || 'User' }}</div>
            <div class="user-email">{{ currentUser?.email || 'user@example.com' }}</div>
          </div>
        </div>
      </div>
      <mat-divider></mat-divider>
      <button mat-menu-item routerLink="/profile">
        <mat-icon>person</mat-icon>
        <span>Profile</span>
      </button>
      <button mat-menu-item routerLink="/settings">
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </button>
      <button mat-menu-item>
        <mat-icon>help</mat-icon>
        <span>Help & Support</span>
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item (click)="logout()">
        <mat-icon>logout</mat-icon>
        <span>Logout</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    .banking-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .brand-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .logo-button {
      margin-right: 8px;
    }

    .brand-name {
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }

    .nav-menu {
      display: flex;
      gap: 8px;
    }

    .nav-menu button {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .nav-menu button.active {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .user-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .menu-header {
      padding: 16px;
      border-bottom: 1px solid #e0e0e0;
    }

    .menu-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-info mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .user-name {
      font-weight: 500;
      font-size: 14px;
    }

    .user-email {
      font-size: 12px;
      color: #666;
    }

    .notification-menu,
    .user-menu {
      min-width: 250px;
    }

    .view-all {
      text-align: center;
      font-weight: 500;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .nav-menu {
        display: none;
      }

      .brand-name {
        font-size: 16px;
      }

      .nav-menu button span {
        display: none;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);

  isAuthenticated$: Observable<boolean>;
  currentUser: any = null;

  constructor() {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit(): void {
    // Subscribe to authentication status changes
    this.authService.isAuthenticated$.subscribe((status: boolean) => {
      if (status) {
        this.loadCurrentUser();
      } else {
        this.currentUser = null;
      }
    });
  }

  private loadCurrentUser(): void {
    // Load current user information
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Error loading current user:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
      },
      error: (error) => {
        console.error('Error during logout:', error);
      }
    });
  }
}

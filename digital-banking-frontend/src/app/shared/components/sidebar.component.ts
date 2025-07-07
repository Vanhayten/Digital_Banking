import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/services/auth.service';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <aside class="sidebar" [ngClass]="{ 'sidebar-open': isOpen }">
      <div class="sidebar-content">
        <!-- User Profile Section -->
        <div class="user-profile">
          <div class="user-avatar">
            <mat-icon>account_circle</mat-icon>
          </div>
          <div class="user-info" *ngIf="currentUser">
            <h3 class="user-name">{{ currentUser.firstName }} {{ currentUser.lastName }}</h3>
            <p class="user-role">{{ currentUser.role || 'Administrator' }}</p>
          </div>
        </div>

        <mat-divider></mat-divider>

        <!-- Navigation Menu -->
        <nav class="navigation-menu">
          <mat-list>
            <mat-list-item *ngFor="let item of menuItems" 
                           [routerLink]="item.route"
                           routerLinkActive="active-menu-item"
                           class="menu-item">
              <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
              <span matListItemTitle>{{ item.title }}</span>
            </mat-list-item>
          </mat-list>
        </nav>

        <!-- Footer -->
        <div class="sidebar-footer">
          <mat-divider></mat-divider>
          <div class="footer-content">
            <p class="text-xs text-gray-500">Digital Banking v1.0</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div class="sidebar-overlay" 
         [ngClass]="{ 'overlay-visible': isOpen }" 
         (click)="closeSidebar()"
         *ngIf="isOpen">
    </div>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      top: 64px;
      left: 0;
      width: 280px;
      height: calc(100vh - 64px);
      background: white;
      box-shadow: 2px 0 4px rgba(0,0,0,0.1);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 999;
      overflow-y: auto;
    }

    .sidebar-open {
      transform: translateX(0);
    }

    @media (min-width: 1024px) {
      .sidebar {
        transform: translateX(0);
        position: fixed;
      }
    }

    .sidebar-content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .user-profile {
      padding: 24px 16px;
      display: flex;
      align-items: center;
      space-x: 12px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    }

    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #667eea;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      margin-right: 12px;
    }

    .user-info {
      flex: 1;
    }

    .user-name {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }

    .user-role {
      font-size: 14px;
      color: #6b7280;
      margin: 4px 0 0 0;
    }

    .navigation-menu {
      flex: 1;
      padding: 16px 0;
    }

    .menu-item {
      margin: 4px 16px;
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .menu-item:hover {
      background-color: #f3f4f6;
    }

    .active-menu-item {
      background-color: #dbeafe !important;
      color: #1d4ed8;
    }

    .active-menu-item mat-icon {
      color: #1d4ed8;
    }

    .sidebar-footer {
      margin-top: auto;
    }

    .footer-content {
      padding: 16px;
      text-align: center;
    }

    .sidebar-overlay {
      position: fixed;
      top: 64px;
      left: 0;
      width: 100vw;
      height: calc(100vh - 64px);
      background: rgba(0, 0, 0, 0.5);
      z-index: 998;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .overlay-visible {
      opacity: 1;
      visibility: visible;
    }

    @media (min-width: 1024px) {
      .sidebar-overlay {
        display: none;
      }
    }
  `]
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false;

  currentUser: any = null;
  menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      title: 'Customers',
      icon: 'people',
      route: '/customers'
    },
    {
      title: 'Accounts',
      icon: 'account_balance',
      route: '/accounts'
    },
    {
      title: 'Transactions',
      icon: 'receipt_long',
      route: '/transactions'
    },
    {
      title: 'Reports',
      icon: 'analytics',
      route: '/reports'
    },
    {
      title: 'Settings',
      icon: 'settings',
      route: '/settings'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize currentUser after the component is created
    this.currentUser = this.authService.getCurrentUser();

    // Subscribe to current user changes
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  closeSidebar(): void {
    this.isOpen = false;
  }
}
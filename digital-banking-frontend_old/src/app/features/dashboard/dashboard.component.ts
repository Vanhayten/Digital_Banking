import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header.component';
import { SidebarComponent } from '../../shared/components/sidebar.component';
import { StatsCardComponent } from './components/stats-card.component';
import { RecentTransactionsComponent } from './components/recent-transactions.component';
import { AccountOverviewComponent } from './components/account-overview.component';
import { QuickActionsComponent } from './components/quick-actions.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    HeaderComponent,
    SidebarComponent,
    StatsCardComponent,
    RecentTransactionsComponent,
    AccountOverviewComponent,
    QuickActionsComponent
  ],
  template: `
    <div class="dashboard-layout">
      <!-- Header -->
      <app-header (toggleSidebar)="sidebarOpen = !sidebarOpen"></app-header>

      <div class="dashboard-content">
        <!-- Sidebar -->
        <app-sidebar [isOpen]="sidebarOpen"></app-sidebar>

        <!-- Main Content -->
        <main class="main-content">
          <div class="dashboard-container">
            <!-- Welcome Section -->
            <div class="welcome-section mb-8">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {{ currentUser.firstName || 'User' }}!
              </h1>
              <p class="text-gray-600">
                Here's what's happening with your banking operations today.
              </p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <app-stats-card
                title="Total Customers"
                [value]="dashboardStats.totalCustomers"
                icon="people"
                color="blue"
                [trend]="12"
                trendLabel="vs last month">
              </app-stats-card>

              <app-stats-card
                title="Active Accounts"
                [value]="dashboardStats.activeAccounts"
                icon="account_balance"
                color="green"
                [trend]="8"
                trendLabel="vs last month">
              </app-stats-card>

              <app-stats-card
                title="Total Balance"
                [value]="dashboardStats.totalBalance"
                icon="account_balance_wallet"
                color="purple"
                [trend]="15"
                trendLabel="vs last month"
                prefix="$">
              </app-stats-card>

              <app-stats-card
                title="Transactions Today"
                [value]="dashboardStats.todayTransactions"
                icon="receipt_long"
                color="orange"
                [trend]="5"
                trendLabel="vs yesterday">
              </app-stats-card>
            </div>

            <!-- Main Dashboard Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Account Overview -->
              <div class="lg:col-span-2">
                <app-account-overview></app-account-overview>
              </div>

              <!-- Quick Actions -->
              <div class="lg:col-span-1">
                <app-quick-actions></app-quick-actions>
              </div>
            </div>

            <!-- Recent Transactions -->
            <div class="mt-6">
              <app-recent-transactions></app-recent-transactions>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-layout {
      min-height: 100vh;
      background-color: #f8fafc;
    }

    .dashboard-content {
      display: flex;
      padding-top: 64px;
    }

    .main-content {
      flex: 1;
      padding: 0;
      margin-left: 0;
      transition: margin-left 0.3s ease;
    }

    @media (min-width: 1024px) {
      .main-content {
        margin-left: 280px;
      }
    }

    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .welcome-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      border-radius: 16px;
      margin-bottom: 2rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  sidebarOpen = false;
  currentUser = { firstName: 'John', lastName: 'Doe' }; // This should come from AuthService

  dashboardStats = {
    totalCustomers: 1247,
    activeAccounts: 892,
    totalBalance: 2847593,
    todayTransactions: 156
  };

  ngOnInit(): void {
    // Load dashboard data
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // TODO: Implement actual data loading from services
    console.log('Loading dashboard data...');
  }
}
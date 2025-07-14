import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <header class="banking-header">
      <div class="header-content">
        <div class="brand-section">
          <span class="brand-name">🏦 Digital Banking</span>
        </div>
        <nav class="nav-menu">
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/customers" routerLinkActive="active">Customers</a>
          <a routerLink="/accounts" routerLinkActive="active">Accounts</a>
        </nav>
      </div>
    </header>
    
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .banking-header {
      background-color: #1976d2;
      color: white;
      padding: 16px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .brand-name {
      font-size: 20px;
      font-weight: 500;
    }
    
    .nav-menu {
      display: flex;
      gap: 20px;
    }
    
    .nav-menu a {
      color: white;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    
    .nav-menu a:hover,
    .nav-menu a.active {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .main-content {
      min-height: calc(100vh - 80px);
      background-color: #f5f5f5;
    }
  `]
})
export class AppComponent {
  title = 'digital-banking-frontend';
}
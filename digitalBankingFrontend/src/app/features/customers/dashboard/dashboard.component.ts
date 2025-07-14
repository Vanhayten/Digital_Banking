import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Navigation -->
      <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <h1 class="text-xl font-bold text-gray-900">Digital Banking</h1>
              </div>
              <div class="hidden md:ml-6 md:flex md:space-x-8">
                <a
                  routerLink="/dashboard"
                  class="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium"
                >
                  Dashboard
                </a>
                <a
                  routerLink="/customers"
                  class="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
                >
                  Customers
                </a>
                <a
                  routerLink="/accounts"
                  class="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
                >
                  Accounts
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <button
                (click)="logout()"
                class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div
            class="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center"
          >
            <div class="text-center">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Digital Banking
              </h2>
              <p class="text-gray-600 mb-6">Your banking dashboard is ready!</p>
              <div class="space-x-4">
                <a
                  routerLink="/customers"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Manage Customers
                </a>
                <a
                  routerLink="/accounts"
                  class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  View Accounts
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class DashboardComponent {
  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}

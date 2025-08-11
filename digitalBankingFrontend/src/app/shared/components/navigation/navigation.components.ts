// src/app/shared/components/navigation/navigation.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-xl font-bold text-blue-600">Digital Banking</h1>
            </div>
            <div class="hidden md:ml-6 md:flex md:space-x-8">
              <a
                routerLink="/dashboard"
                routerLinkActive="border-blue-500 text-gray-900"
                [routerLinkActiveOptions]="{ exact: true }"
                class="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                routerLink="/customers"
                routerLinkActive="border-blue-500 text-gray-900"
                class="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
              >
                Customers
              </a>
              <a
                routerLink="/accounts"
                routerLinkActive="border-blue-500 text-gray-900"
                class="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
              >
                Accounts
              </a>
            </div>
          </div>
          <div class="flex items-center">
            <button
              (click)="logout()"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class NavigationComponent {
  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}

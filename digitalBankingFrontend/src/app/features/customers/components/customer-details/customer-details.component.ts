import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../../core/services/customer.service';
import { CustomerDTO } from '../../../../core/models/customer.model';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <button
          (click)="goBack()"
          class="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back to Customers
        </button>

        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Customer Details</h1>
            <p class="text-gray-600 mt-1">
              View and manage customer information
            </p>
          </div>

          @if (customer()) {
          <div class="flex gap-3">
            <button
              [routerLink]="['/customers', customer()?.id, 'edit']"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              Edit Customer
            </button>
            <button
              (click)="confirmDelete()"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
              Delete
            </button>
          </div>
          }
        </div>
      </div>

      <!-- Loading State -->
      @if (isLoading()) {
      <div class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <span class="ml-2 text-gray-600">Loading customer details...</span>
      </div>
      }

      <!-- Error State -->
      @if (errorMessage()) {
      <div
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6"
      >
        {{ errorMessage() }}
      </div>
      }

      <!-- Customer Details -->
      @if (!isLoading() && customer()) {
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Info Card -->
        <div class="lg:col-span-2">
          <div class="bg-white shadow-sm rounded-lg border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">
                Customer Information
              </h2>
            </div>
            <div class="p-6">
              <div class="flex items-center mb-6">
                <div class="flex-shrink-0 h-16 w-16">
                  <div
                    class="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center"
                  >
                    <span class="text-xl font-medium text-blue-600">
                      {{ getInitials(customer()?.name || '') }}
                    </span>
                  </div>
                </div>
                <div class="ml-6">
                  <h3 class="text-xl font-bold text-gray-900">
                    {{ customer()?.name }}
                  </h3>
                  <p class="text-gray-600">Customer ID: {{ customer()?.id }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Email Address</label
                  >
                  <p class="text-gray-900">{{ customer()?.email }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Phone Number</label
                  >
                  <p class="text-gray-900">{{ customer()?.phone }}</p>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Address</label
                  >
                  <p class="text-gray-900">{{ customer()?.address }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Created Date</label
                  >
                  <p class="text-gray-900">
                    {{ formatDate(customer()?.createdAt) }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Last Updated</label
                  >
                  <p class="text-gray-900">
                    {{ formatDate(customer()?.updatedAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions Card -->
        <div class="lg:col-span-1">
          <div class="bg-white shadow-sm rounded-lg border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Quick Actions</h2>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <button
                  [routerLink]="['/accounts/new']"
                  [queryParams]="{ customerId: customer()?.id }"
                  class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  Create Account
                </button>

                <button
                  [routerLink]="['/accounts']"
                  [queryParams]="{ customerId: customer()?.id }"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                  </svg>
                  View Accounts
                </button>

                <button
                  [routerLink]="['/transactions']"
                  [queryParams]="{ customerId: customer()?.id }"
                  class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                  View Transactions
                </button>
              </div>
            </div>
          </div>

          <!-- Customer Stats Card -->
          <div
            class="bg-white shadow-sm rounded-lg border border-gray-200 mt-6"
          >
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Account Summary</h2>
            </div>
            <div class="p-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">0</div>
                <div class="text-sm text-gray-600">Total Accounts</div>
              </div>
              <div class="mt-4 text-center">
                <div class="text-lg font-semibold text-green-600">$0.00</div>
                <div class="text-sm text-gray-600">Total Balance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }

      <!-- Delete Confirmation Modal -->
      @if (showDeleteModal()) {
      <div
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div
          class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        >
          <div class="mt-3 text-center">
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
            >
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mt-2">
              Delete Customer
            </h3>
            <div class="mt-2 px-7 py-3">
              <p class="text-sm text-gray-500">
                Are you sure you want to delete
                <strong>{{ customer()?.name }}</strong
                >? This action cannot be undone and will also delete all
                associated accounts.
              </p>
            </div>
            <div class="flex gap-4 justify-center mt-4">
              <button
                (click)="cancelDelete()"
                class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                (click)="deleteCustomer()"
                [disabled]="isDeleting()"
                class="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 disabled:opacity-50"
              >
                @if (isDeleting()) {
                <span class="flex items-center">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Deleting...
                </span>
                } @else { Delete Customer }
              </button>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  `,
})
export class CustomerDetailsComponent implements OnInit {
  private customerService = inject(CustomerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  customer = signal<CustomerDTO | null>(null);
  isLoading = signal(false);
  errorMessage = signal('');
  showDeleteModal = signal(false);
  isDeleting = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCustomer(parseInt(id, 10));
    }
  }

  loadCustomer(id: number): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.customerService.getCustomerById(id).subscribe({
      next: (customer) => {
        this.customer.set(customer);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load customer details.');
        this.isLoading.set(false);
        console.error('Error loading customer:', error);
      },
    });
  }

  confirmDelete(): void {
    this.showDeleteModal.set(true);
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
  }

  deleteCustomer(): void {
    const customer = this.customer();
    if (!customer?.id) return;

    this.isDeleting.set(true);

    this.customerService.deleteCustomer(customer.id).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.showDeleteModal.set(false);
        this.router.navigate(['/customers']);
      },
      error: (error) => {
        this.isDeleting.set(false);
        this.errorMessage.set('Failed to delete customer.');
        console.error('Delete error:', error);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/customers']);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

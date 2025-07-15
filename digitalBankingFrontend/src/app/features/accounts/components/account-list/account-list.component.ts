import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../../core/services/account.service';
import { CustomerService } from '../../../../core/services/customer.service';
import {
  BankAccountDTO,
  AccountStatus,
  AccountType,
  DebitRequest,
  CreditRequest,
} from '../../../../core/models/account.model';
import { CustomerDTO } from '../../../../core/models/customer.model';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Bank Accounts</h1>
          <p class="text-gray-600 mt-1">Manage customer bank accounts</p>
        </div>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          (click)="createNewAccount()"
        >
          <svg
            class="w-5 h-5"
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
      </div>

      <!-- Filters -->
      <div
        class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Search Accounts</label
            >
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="applyFilters()"
              placeholder="Search by account ID or customer name..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Account Type</label
            >
            <select
              [(ngModel)]="selectedType"
              (change)="applyFilters()"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="CURRENT">Current Account</option>
              <option value="SAVING">Saving Account</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Status</label
            >
            <select
              [(ngModel)]="selectedStatus"
              (change)="applyFilters()"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="CREATED">Created</option>
              <option value="ACTIVATED">Activated</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      @if (isLoading()) {
      <div class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <span class="ml-2 text-gray-600">Loading accounts...</span>
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

      <!-- Empty State -->
      @if (!isLoading() && filteredAccounts().length === 0 && !searchTerm &&
      !selectedType && !selectedStatus) {
      <div class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
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
        <h3 class="mt-2 text-sm font-medium text-gray-900">No accounts</h3>
        <p class="mt-1 text-sm text-gray-500">
          Get started by creating a new bank account.
        </p>
        <div class="mt-6">
          <button
            (click)="createNewAccount()"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Create Account
          </button>
        </div>
      </div>
      }

      <!-- No Search Results -->
      @if (!isLoading() && filteredAccounts().length === 0 && (searchTerm ||
      selectedType || selectedStatus)) {
      <div class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          No accounts found
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Try adjusting your search criteria.
        </p>
        <button
          (click)="clearFilters()"
          class="mt-4 text-blue-600 hover:text-blue-500 text-sm font-medium"
        >
          Clear filters
        </button>
      </div>
      }

      <!-- Accounts Grid -->
      @if (!isLoading() && filteredAccounts().length > 0) {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (account of filteredAccounts(); track account.id) {
        <div
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <!-- Account Header -->
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center"
                    [class]="getAccountTypeColor(account.accountType)"
                  >
                    <svg
                      class="w-5 h-5 text-white"
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
                  </div>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-gray-900">
                    {{ formatAccountType(account.accountType) }}
                  </h3>
                  <p class="text-xs text-gray-500">{{ account.id }}</p>
                </div>
              </div>
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                [class]="getStatusColor(account.status)"
              >
                {{ account.status }}
              </span>
            </div>
          </div>

          <!-- Account Details -->
          <div class="p-6">
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">Customer</p>
                <p class="text-sm font-medium text-gray-900">
                  {{ account.customer.name }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Balance</p>
                <p
                  class="text-lg font-bold"
                  [class]="getBalanceColor(account.balance)"
                >
                  {{ formatCurrency(account.balance) }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Created</p>
                <p class="text-sm text-gray-900">
                  {{ formatDate(account.createdAt) }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Created By</p>
                <p class="text-sm text-gray-900">{{ account.createdBy }}</p>
              </div>
            </div>
          </div>

          <!-- Account Actions -->
          <div
            class="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg"
          >
            <div class="flex justify-between items-center">
              <div class="flex space-x-2">
                <button
                  (click)="viewAccountDetails(account)"
                  class="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  View Details
                </button>
                <button
                  (click)="viewTransactions(account)"
                  class="text-green-600 hover:text-green-900 text-sm font-medium"
                >
                  History
                </button>
              </div>
              <div class="flex space-x-1">
                <button
                  (click)="openTransactionModal(account, 'credit')"
                  class="p-1 text-green-600 hover:text-green-900 rounded"
                  title="Credit Account"
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
                </button>
                <button
                  (click)="openTransactionModal(account, 'debit')"
                  class="p-1 text-red-600 hover:text-red-900 rounded"
                  title="Debit Account"
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
                      d="M20 12H4"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
      }

      <!-- Transaction Modal -->
      @if (showTransactionModal()) {
      <div
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div
          class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        >
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              {{
                transactionType() === 'credit'
                  ? 'Credit Account'
                  : 'Debit Account'
              }}
            </h3>
            <div class="mb-4">
              <p class="text-sm text-gray-600">
                Account: {{ selectedAccount()?.id }}
              </p>
              <p class="text-sm text-gray-600">
                Current Balance:
                {{ formatCurrency(selectedAccount()?.balance || 0) }}
              </p>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Amount</label
                >
                <input
                  type="number"
                  [(ngModel)]="transactionAmount"
                  min="0.01"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Description</label
                >
                <textarea
                  [(ngModel)]="transactionDescription"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter transaction description"
                ></textarea>
              </div>
            </div>
            <div class="flex gap-4 justify-end mt-6">
              <button
                (click)="closeTransactionModal()"
                class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                (click)="processTransaction()"
                [disabled]="
                  !transactionAmount ||
                  transactionAmount <= 0 ||
                  !transactionDescription ||
                  isProcessingTransaction()
                "
                class="px-4 py-2 text-white text-base font-medium rounded-md shadow-sm disabled:opacity-50"
                [class]="
                  transactionType() === 'credit'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                "
              >
                @if (isProcessingTransaction()) {
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
                  Processing...
                </span>
                } @else {
                {{
                  transactionType() === 'credit'
                    ? 'Credit Account'
                    : 'Debit Account'
                }}
                }
              </button>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  `,
})
export class AccountListComponent implements OnInit {
  private accountService = inject(AccountService);
  private customerService = inject(CustomerService);

  accounts = signal<BankAccountDTO[]>([]);
  customers = signal<CustomerDTO[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  // Filters
  searchTerm = '';
  selectedType = '';
  selectedStatus = '';

  // Transaction modal
  showTransactionModal = signal(false);
  selectedAccount = signal<BankAccountDTO | null>(null);
  transactionType = signal<'credit' | 'debit'>('credit');
  transactionAmount: number = 0;
  transactionDescription = '';
  isProcessingTransaction = signal(false);

  // Computed filtered accounts
  filteredAccounts = computed(() => {
    let filtered = this.accounts();

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (account) =>
          account.id.toLowerCase().includes(term) ||
          account.customer.name.toLowerCase().includes(term)
      );
    }

    if (this.selectedType) {
      filtered = filtered.filter(
        (account) => account.accountType === this.selectedType
      );
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(
        (account) => account.status === this.selectedStatus
      );
    }

    return filtered;
  });

  ngOnInit(): void {
    this.loadAccounts();
    this.loadCustomers();
  }

  loadAccounts(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts.set(accounts);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load accounts. Please try again.');
        this.isLoading.set(false);
        console.error('Error loading accounts:', error);
      },
    });
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers.set(customers);
      },
      error: (error) => {
        console.error('Error loading customers:', error);
      },
    });
  }

  applyFilters(): void {
    // Filters are applied automatically through computed signal
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedStatus = '';
  }

  createNewAccount(): void {
    console.log('Create new account - functionality coming soon!');
  }

  viewAccountDetails(account: BankAccountDTO): void {
    console.log('View account details:', account.id);
  }

  viewTransactions(account: BankAccountDTO): void {
    console.log('View transactions for account:', account.id);
  }

  openTransactionModal(
    account: BankAccountDTO,
    type: 'credit' | 'debit'
  ): void {
    this.selectedAccount.set(account);
    this.transactionType.set(type);
    this.transactionAmount = 0;
    this.transactionDescription = '';
    this.showTransactionModal.set(true);
  }

  closeTransactionModal(): void {
    this.showTransactionModal.set(false);
    this.selectedAccount.set(null);
    this.transactionAmount = 0;
    this.transactionDescription = '';
  }

  processTransaction(): void {
    const account = this.selectedAccount();
    if (
      !account?.id ||
      !this.transactionAmount ||
      this.transactionAmount <= 0 ||
      !this.transactionDescription
    )
      return;

    this.isProcessingTransaction.set(true);

    const request =
      this.transactionType() === 'credit'
        ? ({
            accountId: account.id,
            amount: this.transactionAmount,
            description: this.transactionDescription,
          } as CreditRequest)
        : ({
            accountId: account.id,
            amount: this.transactionAmount,
            description: this.transactionDescription,
          } as DebitRequest);

    const operation =
      this.transactionType() === 'credit'
        ? this.accountService.creditAccount(request as CreditRequest)
        : this.accountService.debitAccount(request as DebitRequest);

    operation.subscribe({
      next: (updatedAccount) => {
        // Update the account in the list
        const accounts = this.accounts();
        const index = accounts.findIndex((a) => a.id === updatedAccount.id);
        if (index !== -1) {
          accounts[index] = updatedAccount;
          this.accounts.set([...accounts]);
        }

        this.isProcessingTransaction.set(false);
        this.closeTransactionModal();
      },
      error: (error) => {
        this.isProcessingTransaction.set(false);
        this.errorMessage.set(
          `Failed to ${this.transactionType()} account. Please try again.`
        );
        console.error('Transaction error:', error);
      },
    });
  }

  getAccountTypeColor(type: AccountType): string {
    switch (type) {
      case AccountType.CURRENT:
        return 'bg-blue-500';
      case AccountType.SAVING:
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  }

  getStatusColor(status: AccountStatus): string {
    switch (status) {
      case AccountStatus.CREATED:
        return 'bg-yellow-100 text-yellow-800';
      case AccountStatus.ACTIVATED:
        return 'bg-green-100 text-green-800';
      case AccountStatus.SUSPENDED:
        return 'bg-orange-100 text-orange-800';
      case AccountStatus.CLOSED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getBalanceColor(balance: number): string {
    if (balance > 0) return 'text-green-600';
    if (balance < 0) return 'text-red-600';
    return 'text-gray-900';
  }

  formatAccountType(type: AccountType): string {
    switch (type) {
      case AccountType.CURRENT:
        return 'Current Account';
      case AccountType.SAVING:
        return 'Saving Account';
      default:
        return type;
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}

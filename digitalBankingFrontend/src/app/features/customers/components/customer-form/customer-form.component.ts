import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../core/services/customer.service';
import { CustomerDTO } from '../../../../core/models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8 max-w-2xl">
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

        <h1 class="text-3xl font-bold text-gray-900">
          {{ isEditMode() ? 'Edit Customer' : 'Add New Customer' }}
        </h1>
        <p class="text-gray-600 mt-1">
          {{
            isEditMode()
              ? 'Update customer information'
              : 'Create a new customer account'
          }}
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white shadow-sm rounded-lg border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">
            Customer Information
          </h2>
        </div>

        <form [formGroup]="customerForm" (ngSubmit)="onSubmit()" class="p-6">
          @if (errorMessage()) {
          <div
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6"
          >
            {{ errorMessage() }}
          </div>
          } @if (successMessage()) {
          <div
            class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6"
          >
            {{ successMessage() }}
          </div>
          }

          <div class="grid grid-cols-1 gap-6">
            <!-- Name Field -->
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                formControlName="name"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
              />
              @if (customerForm.get('name')?.invalid &&
              customerForm.get('name')?.touched) {
              <p class="mt-1 text-sm text-red-600">Full name is required</p>
              }
            </div>

            <!-- Email Field -->
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                formControlName="email"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
              />
              @if (customerForm.get('email')?.invalid &&
              customerForm.get('email')?.touched) {
              <div class="mt-1 text-sm text-red-600">
                @if (customerForm.get('email')?.errors?.['required']) { Email is
                required } @if (customerForm.get('email')?.errors?.['email']) {
                Please enter a valid email address }
              </div>
              }
            </div>

            <!-- Phone Field -->
            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                formControlName="phone"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
              />
              @if (customerForm.get('phone')?.invalid &&
              customerForm.get('phone')?.touched) {
              <p class="mt-1 text-sm text-red-600">Phone number is required</p>
              }
            </div>

            <!-- Address Field -->
            <div>
              <label
                for="address"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Address *
              </label>
              <textarea
                id="address"
                formControlName="address"
                rows="3"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full address"
              ></textarea>
              @if (customerForm.get('address')?.invalid &&
              customerForm.get('address')?.touched) {
              <p class="mt-1 text-sm text-red-600">Address is required</p>
              }
            </div>
          </div>

          <!-- Form Actions -->
          <div
            class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200"
          >
            <button
              type="button"
              (click)="goBack()"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="customerForm.invalid || isLoading()"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              @if (isLoading()) {
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
              }
              {{ isEditMode() ? 'Update Customer' : 'Create Customer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class CustomerFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  customerForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  isEditMode = signal(false);
  customerId: number | null = null;

  constructor() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.customerId = parseInt(id, 10);
      this.isEditMode.set(true);
      this.loadCustomer();
    }
  }

  loadCustomer(): void {
    if (!this.customerId) return;

    this.isLoading.set(true);
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer) => {
        this.customerForm.patchValue({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
        });
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load customer data.');
        this.isLoading.set(false);
        console.error('Error loading customer:', error);
      },
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const customerData: CustomerDTO = this.customerForm.value;

      const operation =
        this.isEditMode() && this.customerId
          ? this.customerService.updateCustomer(this.customerId, customerData)
          : this.customerService.createCustomer(customerData);

      operation.subscribe({
        next: (customer) => {
          this.isLoading.set(false);
          this.successMessage.set(
            this.isEditMode()
              ? 'Customer updated successfully!'
              : 'Customer created successfully!'
          );

          // Redirect after a short delay
          setTimeout(() => {
            this.router.navigate(['/customers']);
          }, 1500);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(
            error.error?.message ||
              `Failed to ${
                this.isEditMode() ? 'update' : 'create'
              } customer. Please try again.`
          );
          console.error('Error saving customer:', error);
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/customers']);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../core/models/account.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="customer-form-container">
      <div class="form-card">
        <div class="form-header">
          <h1>{{ isEditMode ? 'Edit Customer' : 'Add New Customer' }}</h1>
        </div>

        <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
          <div class="form-row">
            <div class="form-field">
              <label for="firstName">First Name *</label>
              <input 
                id="firstName"
                type="text" 
                formControlName="firstName" 
                [class.error]="customerForm.get('firstName')?.invalid && customerForm.get('firstName')?.touched"
              >
              <div class="error-message" *ngIf="customerForm.get('firstName')?.hasError('required') && customerForm.get('firstName')?.touched">
                First name is required
              </div>
            </div>

            <div class="form-field">
              <label for="lastName">Last Name *</label>
              <input 
                id="lastName"
                type="text" 
                formControlName="lastName"
                [class.error]="customerForm.get('lastName')?.invalid && customerForm.get('lastName')?.touched"
              >
              <div class="error-message" *ngIf="customerForm.get('lastName')?.hasError('required') && customerForm.get('lastName')?.touched">
                Last name is required
              </div>
            </div>
          </div>

          <div class="form-field">
            <label for="email">Email *</label>
            <input 
              id="email"
              type="email" 
              formControlName="email"
              [class.error]="customerForm.get('email')?.invalid && customerForm.get('email')?.touched"
            >
            <div class="error-message" *ngIf="customerForm.get('email')?.hasError('required') && customerForm.get('email')?.touched">
              Email is required
            </div>
            <div class="error-message" *ngIf="customerForm.get('email')?.hasError('email') && customerForm.get('email')?.touched">
              Please enter a valid email
            </div>
          </div>

          <div class="form-field">
            <label for="phoneNumber">Phone Number *</label>
            <input 
              id="phoneNumber"
              type="tel" 
              formControlName="phoneNumber"
              [class.error]="customerForm.get('phoneNumber')?.invalid && customerForm.get('phoneNumber')?.touched"
            >
            <div class="error-message" *ngIf="customerForm.get('phoneNumber')?.hasError('required') && customerForm.get('phoneNumber')?.touched">
              Phone number is required
            </div>
          </div>

          <div class="form-field">
            <label for="address">Address *</label>
            <textarea 
              id="address"
              formControlName="address" 
              rows="3"
              [class.error]="customerForm.get('address')?.invalid && customerForm.get('address')?.touched"
            ></textarea>
            <div class="error-message" *ngIf="customerForm.get('address')?.hasError('required') && customerForm.get('address')?.touched">
              Address is required
            </div>
          </div>

          <div class="form-field">
            <label for="dateOfBirth">Date of Birth *</label>
            <input 
              id="dateOfBirth"
              type="date" 
              formControlName="dateOfBirth"
              [class.error]="customerForm.get('dateOfBirth')?.invalid && customerForm.get('dateOfBirth')?.touched"
            >
            <div class="error-message" *ngIf="customerForm.get('dateOfBirth')?.hasError('required') && customerForm.get('dateOfBirth')?.touched">
              Date of birth is required
            </div>
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="btn-primary" 
              [disabled]="customerForm.invalid || isLoading"
            >
              {{ isLoading ? 'Saving...' : (isEditMode ? 'Update' : 'Create') }} Customer
            </button>
            <button type="button" class="btn-secondary" (click)="onCancel()">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .customer-form-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    .form-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .form-header {
      background-color: #1976d2;
      color: white;
      padding: 20px;
    }

    .form-header h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    form {
      padding: 24px;
    }

    .form-row {
      display: flex;
      gap: 16px;
    }

    .form-row .form-field {
      flex: 1;
    }

    .form-field {
      margin-bottom: 20px;
    }

    .form-field label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: #333;
    }

    .form-field input,
    .form-field textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .form-field input:focus,
    .form-field textarea:focus {
      outline: none;
      border-color: #1976d2;
    }

    .form-field input.error,
    .form-field textarea.error {
      border-color: #d32f2f;
    }

    .error-message {
      color: #d32f2f;
      font-size: 12px;
      margin-top: 4px;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }

    .btn-primary {
      background-color: #1976d2;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #1565c0;
    }

    .btn-primary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .btn-secondary {
      background-color: #f5f5f5;
      color: #333;
      border: 1px solid #ddd;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .btn-secondary:hover {
      background-color: #e0e0e0;
    }

    @media (max-width: 768px) {
      .form-row {
        flex-direction: column;
      }

      .customer-form-container {
        padding: 10px;
      }
    }
  `]
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;
  customerId: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[+]?[0-9]{10,15}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      dateOfBirth: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerId = parseInt(id, 10);
      this.isEditMode = true;
      this.loadCustomer();
    }
  }

  private loadCustomer(): void {
    if (this.customerId) {
      this.isLoading = true;
      this.customerService.getCustomer(this.customerId).subscribe({
        next: (customer) => {
          this.customerForm.patchValue({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            address: customer.address,
            dateOfBirth: customer.dateOfBirth ? new Date(customer.dateOfBirth).toISOString().split('T')[0] : ''
          });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading customer:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.isLoading = true;
      const customerData = this.customerForm.value;

      const operation = this.isEditMode && this.customerId
        ? this.customerService.updateCustomer(this.customerId, customerData)
        : this.customerService.createCustomer(customerData);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          console.error('Error saving customer:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }
}

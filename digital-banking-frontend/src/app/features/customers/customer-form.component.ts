import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../core/models/account.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <div class="banking-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Edit Customer' : 'Add New Customer' }}</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" required>
                <mat-error *ngIf="customerForm.get('firstName')?.hasError('required')">
                  First name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" required>
                <mat-error *ngIf="customerForm.get('lastName')?.hasError('required')">
                  Last name is required
                </mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              <mat-error *ngIf="customerForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="customerForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Phone Number</mat-label>
              <input matInput formControlName="phoneNumber" required>
              <mat-error *ngIf="customerForm.get('phoneNumber')?.hasError('required')">
                Phone number is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Address</mat-label>
              <textarea matInput formControlName="address" rows="3" required></textarea>
              <mat-error *ngIf="customerForm.get('address')?.hasError('required')">
                Address is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Date of Birth</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="dateOfBirth" required>
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              <mat-error *ngIf="customerForm.get('dateOfBirth')?.hasError('required')">
                Date of birth is required
              </mat-error>
            </mat-form-field>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" 
                  [disabled]="customerForm.invalid || isLoading"
                  (click)="onSubmit()">
            {{ isEditMode ? 'Update' : 'Create' }} Customer
          </button>
          <button mat-button (click)="onCancel()">Cancel</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .banking-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }

    .form-row {
      display: flex;
      gap: 16px;
    }

    .form-row mat-form-field {
      flex: 1;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    mat-card-actions {
      padding: 16px;
      display: flex;
      gap: 8px;
    }
  `]
})
export class CustomerFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);

  customerForm: FormGroup;
  isEditMode = false;
  customerId: number | null = null;
  isLoading = false;

  constructor() {
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
      this.customerId = parseInt(id, 10); // Convert string to number
      this.isEditMode = true;
      this.loadCustomer();
    }
  }

  private loadCustomer(): void {
    if (this.customerId) {
      this.isLoading = true;
      this.customerService.getCustomer(this.customerId).subscribe({
        next: (customer: Customer) => {
          this.customerForm.patchValue({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            address: customer.address,
            dateOfBirth: customer.dateOfBirth
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

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <div class="flex justify-center">
            <div class="bg-blue-600 p-3 rounded-full">
              <mat-icon class="text-white text-3xl">person_add</mat-icon>
            </div>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Join Digital Banking today
          </p>
        </div>

        <!-- Register Form -->
        <mat-card class="card-shadow-lg">
          <mat-card-content class="p-8">
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
              <!-- First Name -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" placeholder="Enter your first name">
                <mat-icon matSuffix>person</mat-icon>
                <mat-error *ngIf="registerForm.get('firstName')?.hasError('required')">
                  First name is required
                </mat-error>
              </mat-form-field>

              <!-- Last Name -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" placeholder="Enter your last name">
                <mat-icon matSuffix>person</mat-icon>
                <mat-error *ngIf="registerForm.get('lastName')?.hasError('required')">
                  Last name is required
                </mat-error>
              </mat-form-field>

              <!-- Email -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" placeholder="Enter your email" type="email">
                <mat-icon matSuffix>email</mat-icon>
                <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>

              <!-- Username -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Username</mat-label>
                <input matInput formControlName="username" placeholder="Choose a username">
                <mat-icon matSuffix>account_circle</mat-icon>
                <mat-error *ngIf="registerForm.get('username')?.hasError('required')">
                  Username is required
                </mat-error>
                <mat-error *ngIf="registerForm.get('username')?.hasError('minlength')">
                  Username must be at least 3 characters
                </mat-error>
              </mat-form-field>

              <!-- Password -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Password</mat-label>
                <input matInput 
                       [type]="hidePassword ? 'password' : 'text'"
                       formControlName="password" 
                       placeholder="Create a password">
                <button mat-icon-button 
                        matSuffix 
                        type="button"
                        (click)="hidePassword = !hidePassword">
                  <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                  Password is required
                </mat-error>
                <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                  Password must be at least 6 characters
                </mat-error>
              </mat-form-field>

              <!-- Submit Button -->
              <button mat-raised-button 
                      color="primary" 
                      type="submit"
                      [disabled]="registerForm.invalid || isLoading"
                      class="w-full h-12 text-lg font-medium">
                <mat-spinner *ngIf="isLoading" diameter="20" class="mr-2"></mat-spinner>
                {{ isLoading ? 'Creating Account...' : 'Create Account' }}
              </button>
            </form>

            <!-- Login Link -->
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600">
                Already have an account?
                <a routerLink="/auth/login" 
                   class="font-medium text-blue-600 hover:text-blue-500 ml-1">
                  Sign in here
                </a>
              </p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .mat-mdc-card {
      border-radius: 16px !important;
    }

    .mat-mdc-form-field {
      margin-bottom: 0.5rem;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private loadingService: LoadingService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.loadingService.show();

      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Account created successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.notificationService.showError('Registration failed. Please try again.');
          console.error('Registration error:', error);
        },
        complete: () => {
          this.isLoading = false;
          this.loadingService.hide();
        }
      });
    }
  }
}
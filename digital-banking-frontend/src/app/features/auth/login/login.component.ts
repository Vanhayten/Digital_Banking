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
  selector: 'app-login',
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
              <mat-icon class="text-white text-3xl">account_balance</mat-icon>
            </div>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Welcome back to Digital Banking
          </p>
        </div>

        <!-- Login Form -->
        <mat-card class="card-shadow-lg">
          <mat-card-content class="p-8">
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Username Field -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Username</mat-label>
                <input matInput 
                       formControlName="username" 
                       placeholder="Enter your username"
                       autocomplete="username">
                <mat-icon matSuffix>person</mat-icon>
                <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
                  Username is required
                </mat-error>
              </mat-form-field>

              <!-- Password Field -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Password</mat-label>
                <input matInput 
                       [type]="hidePassword ? 'password' : 'text'"
                       formControlName="password" 
                       placeholder="Enter your password"
                       autocomplete="current-password">
                <button mat-icon-button 
                        matSuffix 
                        type="button"
                        (click)="hidePassword = !hidePassword">
                  <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                  Password is required
                </mat-error>
                <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
                  Password must be at least 6 characters
                </mat-error>
              </mat-form-field>

              <!-- Submit Button -->
              <button mat-raised-button 
                      color="primary" 
                      type="submit"
                      [disabled]="loginForm.invalid || isLoading"
                      class="w-full h-12 text-lg font-medium">
                <mat-spinner *ngIf="isLoading" diameter="20" class="mr-2"></mat-spinner>
                {{ isLoading ? 'Signing in...' : 'Sign In' }}
              </button>
            </form>

            <!-- Register Link -->
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600">
                Don't have an account?
                <a routerLink="/auth/register" 
                   class="font-medium text-blue-600 hover:text-blue-500 ml-1">
                  Sign up here
                </a>
              </p>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Demo Credentials -->
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 class="text-sm font-medium text-yellow-800 mb-2">Demo Credentials</h3>
          <div class="text-xs text-yellow-700 space-y-1">
            <p><strong>Admin:</strong> admin / admin123</p>
            <p><strong>User:</strong> user / user123</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mat-mdc-card {
      border-radius: 16px !important;
    }

    .mat-mdc-form-field {
      margin-bottom: 1rem;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private loadingService: LoadingService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loadingService.show();

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Login successful!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.notificationService.showError('Login failed. Please check your credentials.');
          console.error('Login error:', error);
        },
        complete: () => {
          this.isLoading = false;
          this.loadingService.hide();
        }
      });
    }
  }
}
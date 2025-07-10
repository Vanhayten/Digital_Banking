import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Customer } from '../../core/models/account.model'; // Use unified model
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatMenuModule,
    RouterModule
  ],
  template: `
    <div class="customer-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Customer Management</mat-card-title>
          <mat-card-subtitle>Manage your customers</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="actions-bar">
            <button mat-raised-button color="primary" routerLink="/customers/new">
              <mat-icon>add</mat-icon>
              Add Customer
            </button>
          </div>

          <mat-divider></mat-divider>

          <div class="table-container" *ngIf="customers.length > 0">
            <table mat-table [dataSource]="customers" class="customers-table">
              <!-- ID Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let customer">{{ customer.id }}</td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Name</th>
                <td mat-cell *matCellDef="let customer">
                  {{ getCustomerName(customer) }}
                </td>
              </ng-container>

              <!-- Email Column -->
              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef>Email</th>
                <td mat-cell *matCellDef="let customer">{{ customer.email }}</td>
              </ng-container>

              <!-- Phone Column -->
              <ng-container matColumnDef="phone">
                <th mat-header-cell *matHeaderCellDef>Phone</th>
                <td mat-cell *matCellDef="let customer">{{ getCustomerPhone(customer) }}</td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let customer">
                  <mat-chip [color]="getStatusColor('active')">
                    Active
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let customer">
                  <button mat-icon-button [matMenuTriggerFor]="menu">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu">
                    <button mat-menu-item [routerLink]="['/customers', customer.id]">
                      <mat-icon>visibility</mat-icon>
                      View
                    </button>
                    <button mat-menu-item [routerLink]="['/customers', customer.id, 'edit']">
                      <mat-icon>edit</mat-icon>
                      Edit
                    </button>
                    <button mat-menu-item (click)="deleteCustomer(customer.id)">
                      <mat-icon>delete</mat-icon>
                      Delete
                    </button>
                  </mat-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>

          <!-- Empty State -->
          <div class="empty-state" *ngIf="customers.length === 0">
            <mat-icon class="empty-icon">people</mat-icon>
            <h3>No customers found</h3>
            <p>Start by adding your first customer</p>
            <button mat-raised-button color="primary" routerLink="/customers/new">
              Add Customer
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .customer-list-container {
      padding: 20px;
    }

    .actions-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .table-container {
      margin-top: 20px;
    }

    .customers-table {
      width: 100%;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
    }

    .empty-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ccc;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      margin: 16px 0 8px 0;
      color: #666;
    }

    .empty-state p {
      color: #999;
      margin-bottom: 24px;
    }
  `]
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'status', 'actions'];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
      }
    });
  }

  // Helper method to get customer name (handles both model formats)
  getCustomerName(customer: Customer): string {
    if (customer.name) {
      return customer.name;
    }
    return `${customer.firstName || ''} ${customer.lastName || ''}`.trim();
  }

  // Helper method to get customer phone (handles both model formats)
  getCustomerPhone(customer: Customer): string {
    return customer.phone || customer.phoneNumber || '';
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'primary';
      case 'inactive':
        return 'warn';
      case 'pending':
        return 'accent';
      default:
        return '';
    }
  }

  deleteCustomer(customerId: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(customerId).subscribe({
        next: () => {
          this.loadCustomers(); // Reload the list
        },
        error: (error) => {
          console.error('Error deleting customer:', error);
        }
      });
    }
  }
}

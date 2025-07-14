import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'customers',
    loadComponent: () => import('./features/customers/customer-list.component').then(m => m.CustomerListComponent)
  },
  {
    path: 'customers/new',
    loadComponent: () => import('./features/customers/customer-form.component').then(m => m.CustomerFormComponent)
  },
  {
    path: 'customers/:id/edit',
    loadComponent: () => import('./features/customers/customer-form.component').then(m => m.CustomerFormComponent)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
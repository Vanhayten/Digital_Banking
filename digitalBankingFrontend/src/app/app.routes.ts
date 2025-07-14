// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  // {
  //   path: 'dashboard',
  //   canActivate: [authGuard],
  //   loadChildren: () =>
  //     import('./features/dashboard/dashboard.routes').then(
  //       (m) => m.dashboardRoutes
  //     ),
  // },
  // {
  //   path: 'customers',
  //   canActivate: [authGuard],
  //   loadChildren: () =>
  //     import('./features/customers/customers.routes').then(
  //       (m) => m.customersRoutes
  //     ),
  // },
  // {
  //   path: 'accounts',
  //   canActivate: [authGuard],
  //   loadChildren: () =>
  //     import('./features/accounts/accounts.routes').then(
  //       (m) => m.accountsRoutes
  //     ),
  // },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];

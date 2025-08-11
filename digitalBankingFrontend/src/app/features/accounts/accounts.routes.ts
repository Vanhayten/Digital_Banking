import { Routes } from '@angular/router';

export const accountsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/account-list/account-list.component').then(
        (m) => m.AccountListComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/account-form/account-form.component').then(
        (m) => m.AccountFormComponent
      ),
  },
  // {
  //   path: ':id',
  //   loadComponent: () =>
  //     import('./components/account-details/account-details.component').then(
  //       (m) => m.AccountDetailsComponent
  //     ),
  // },
  // {
  //   path: ':id/transactions',
  //   loadComponent: () =>
  //     import(
  //       './components/account-transactions/account-transactions.component'
  //     ).then((m) => m.AccountTransactionsComponent),
  // },
];

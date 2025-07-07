export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: number;
  accountNumber: string;
  accountType: 'CHECKING' | 'SAVINGS' | 'CREDIT';
  balance: number;
  currency: string;
  isActive: boolean;
  customer: Customer;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankAccount {
  id: number;
  accountNumber: string;
  accountType: 'CHECKING' | 'SAVINGS' | 'CREDIT';
  balance: number;
  currency: string;
  isActive: boolean;
  customerId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: number;
  accountId: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  description: string;
  timestamp: Date;
  balance: number;
}

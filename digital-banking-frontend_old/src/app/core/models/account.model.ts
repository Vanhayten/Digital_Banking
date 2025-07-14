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
  // Legacy fields for compatibility
  name?: string;
  phone?: string;
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

export interface CurrentAccount extends BankAccount {
  overdraftLimit: number;
  overdraftUsed: number;
}

export interface SavingAccount extends BankAccount {
  interestRate: number;
  minimumBalance: number;
}

export interface Transaction {
  id: number;
  accountId: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  description: string;
  timestamp: Date;
  balance: number;
  reference?: string;
}

export interface AccountHistory {
  accountId: number;
  transactions: Transaction[];
  totalTransactions: number;
  currentPage: number;
  totalPages: number;
}

export interface TransferRequest {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  description: string;
  reference?: string;
}

export interface DebitRequest {
  accountId: number;
  amount: number;
  description: string;
  reference?: string;
}

export interface CreditRequest {
  accountId: number;
  amount: number;
  description: string;
  reference?: string;
}

export interface AccountBalance {
  accountId: number;
  balance: number;
  availableBalance: number;
  currency: string;
  lastUpdated: Date;
}

export interface AccountStatement {
  accountId: number;
  accountNumber: string;
  statementPeriod: {
    startDate: Date;
    endDate: Date;
  };
  openingBalance: number;
  closingBalance: number;
  transactions: Transaction[];
  totalCredits: number;
  totalDebits: number;
}

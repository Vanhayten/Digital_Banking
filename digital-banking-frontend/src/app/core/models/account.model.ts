export enum AccountStatus {
  CREATED = 'CREATED',
  ACTIVATED = 'ACTIVATED',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED'
}

export enum AccountType {
  CURRENT = 'CURRENT',
  SAVING = 'SAVING'
}

export enum OperationType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}

export interface BankAccount {
  id: string;
  balance: number;
  createdAt: string;
  status: AccountStatus;
  accountType: AccountType;
  customer: Customer;
  createdBy: string;
}

export interface CurrentAccount extends BankAccount {
  overDraft: number;
}

export interface SavingAccount extends BankAccount {
  interestRate: number;
}

export interface AccountOperation {
  id: number;
  operationDate: string;
  amount: number;
  type: OperationType;
  description: string;
  performedBy: string;
  accountId: string;
}

export interface AccountHistory {
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  operations: AccountOperation[];
}

export interface TransferRequest {
  sourceAccount: string;
  destAccount: string;
  amount: number;
}

export interface DebitRequest {
  accountId: string;
  amount: number;
  description: string;
}

export interface CreditRequest {
  accountId: string;
  amount: number;
  description: string;
}
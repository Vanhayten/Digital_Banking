import { CustomerDTO } from "./customer.model";

export enum AccountStatus {
  CREATED = 'CREATED',
  ACTIVATED = 'ACTIVATED',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
}

export enum AccountType {
  CURRENT = 'CURRENT',
  SAVING = 'SAVING',
}

export enum OperationType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export interface BankAccountDTO {
  id: string;
  balance: number;
  createdAt: string;
  status: AccountStatus;
  accountType: AccountType;
  customer: CustomerDTO;
  createdBy: string;
}

export interface CurrentAccountDTO extends BankAccountDTO {
  overDraft: number;
}

export interface SavingAccountDTO extends BankAccountDTO {
  interestRate: number;
}

export interface AccountOperationDTO {
  id: number;
  operationDate: string;
  amount: number;
  type: OperationType;
  description: string;
  performedBy: string;
  accountId: string;
}

export interface AccountHistoryDTO {
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  operations: AccountOperationDTO[];
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

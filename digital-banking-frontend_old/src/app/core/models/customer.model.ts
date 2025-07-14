export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt?: string;
  createdBy?: string;
}

export interface CustomerDTO extends Customer {}
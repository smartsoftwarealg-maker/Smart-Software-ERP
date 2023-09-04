export const INVOICES = '/invoices';
export const LIST = '/invoices/list';
export const CLONE = '/invoices/clone';

export interface Invoice {
  id: number;
  number: number;
  date: Date;
  agentId: number;
  denomination?: string;
}

export interface Insert {
  center: number;
  date: Date;
  numbers: number[];
  userId: number;
}

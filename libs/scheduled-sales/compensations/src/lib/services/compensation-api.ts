export const DEBTS_URL = '/ssales/debts';
export const PAYMENTS_URL = '/payments';
export const COMPENSATIONS_URL = '/compensations';

export interface Compensation {
    id: number;
    agentId: number;
    parentId: number;
    paymentId: number;
    description?: string;
    amount: number;
    creationTime: Date;
}

export interface Debt {
    id: number;
    agentId: number;
    invoiceId: number;
    date: Date;
    customerCode?: string;
    customerName: string;
    invoiceNumber: number;
    ftt: number;
    payment: number;
}

export interface InvoicePayment {
    id: number;
    parentId: number;
    description?: string;
    amount: number;
    creationTime: Date;
}

export interface AgentPayment {
    id: number;
    parentId: number;
    amount: number;
    description: string;
}

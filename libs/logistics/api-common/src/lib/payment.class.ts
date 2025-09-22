export const PAYMENT_URL = '/payments';
export const ADVANCEMENTS_URL = '/advancements';

export interface Payment {
    id: number;
    center: number;
    number: string;
    bankId?: number;
    bank?: string;
    depositDate?: Date;
    depositNumber?: string;
    description?: string;
    date?: Date;
    dueDays: number;
    agent?: number;
    amount: number;
    mode?: number;
    canceled: boolean;
    memo?: string;
    debit?: number;
    credit?: number;
    modeDescription?: string;
    denomination?: string;
    isAdvancements?: boolean;
}

export interface Accounting {
    id: number,
    payRef: number;
    checkInfo?: number;
    accountno?: number;
    date?:  Date;
    journalno?: number;
    description?: string;
    balance: number;
    userId?: number;
    creationDate: Date
}

export interface Debt {
    id: number;
    document: string;
    balance: number;
}


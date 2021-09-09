export const PAYMENT_URL = '/payments';

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
    denomination?: string;
}


export const CHECKS_URL = '/treasury/checks';

export interface Check {
    id: number;
    center: number;
    number: String,
    bankId?: number;
    bank?: string;
    deposited: boolean;
    depositDate?: string;
    depositNumber?: string;
    processDate?: string;
    description?: string;
    date?: string;
    due_days: number;
    agent: number;
    amount: number;
    mode?: number;
    canceled: boolean;
    memo?: string;
    bookId?: number;
}
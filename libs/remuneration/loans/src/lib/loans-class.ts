export const LOAN_PAYROLL_CENTERS = '/payroll/centers';
export const LOAN_LOANS = '/loans';
export const LOAN_PAYROLL_LOANS_URLS = '/payroll/loans';
export const CONSUMPTION_URL = '/consumptions';

export interface Consumption {
    paymonth: number;
    consumption: number;
    remaining: number;
    id: number
}

export interface Loan {
    id: number;
    employee: number;
    centerId: number;
    loan: number;
    payMonth: number;
    monthConsumed: number;
    amount?: number;
    taken_amount?: number;
    number?: number;
    date?: Date;
    memo?: string;
    firstName?: string;
    lastName?: string;
    description?: string
}

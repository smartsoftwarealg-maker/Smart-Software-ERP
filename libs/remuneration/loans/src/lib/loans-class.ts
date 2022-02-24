export const LOAN_URL = '/payroll/loans';
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
    center: number;
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

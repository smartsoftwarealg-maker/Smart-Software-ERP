export const AMENDMENT_URL = '/payroll/amendments';

export interface Comparison {
    paymonth: number;
    formula: String;
    description: string;
    oldValue: number;
    newValue: number;
    destination?: string;
}

export interface Amendment {
    id: number;
    center: number;
    employee: number;
    paymonth: number;
    application_month: number;
    element: string;
    new_value: number;
    percentage: boolean;
    month_count?: number;
    rounded?: boolean;
    lastName?: string;
    firstName?: string;
    elementId?: number;
    elementName?: string;
    to?: number;
}

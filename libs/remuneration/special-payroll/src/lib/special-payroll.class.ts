export const SPECIAL_PAYROLL_URL  = '/payroll/special-payrolls';
export const SPECIAL_EMPLOYEE_URL = '/payroll/special-payrolls/employees';
export interface  Special {
    id: number;
    center: number;
    paymonth: number;
    description: string;
}

export interface Lookup {
    id: number;
    description?: string;
}

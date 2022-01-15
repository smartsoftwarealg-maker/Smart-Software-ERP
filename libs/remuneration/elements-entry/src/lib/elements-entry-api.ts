export const INPUT_ELEMENTS_URL = '/payroll/pay-elements';

export interface EData { field: string; value: number }
export interface UPData { id: number;  data: EData[] }

export interface PaymentElement {
    description?: string;
    formula?: string;
    base?: number;
    rate?: number;
    value?: number;
}

export interface ELine {
    id: number;
    firstName: string;
    lastName: string;
    post?: string;
    elements: number[];
    cols?: string;
}

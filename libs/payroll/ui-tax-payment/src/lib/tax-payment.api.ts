export const PERIODS_URL = '/payroll/periods';
export const TAX_PAYMENT_URL = '/tax-payments';

export interface TaxPayment {
    id: number;
    centerId: number;
    parentId: number;
    month: number;
    date?: Date;
    base: number;
    irg: number;
    fund?: number;
}

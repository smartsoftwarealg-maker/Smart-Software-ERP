export const PAYROLL_FORMULAS_URL = '/payroll/formulas';

export interface Formula {
    id: number;
    archiveYear: number;
    variable: string;
    description?: string;
    descriptionAr?: string;
    base?: string;
    rate?: string;
    formula?: string;
    accountno?: string;
    followup_fld?: string;
    val_sign?: number;
}

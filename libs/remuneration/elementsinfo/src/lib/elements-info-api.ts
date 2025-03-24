export const ELEMENTSINFO_URL = '/payroll/elementsinfo';
export const COMMON_ELEMENTSINFO_URL = '/payroll/common-elementsinfo';

export interface ElementsInfo {
    id: number;
    field: string;
    description: string;
    fixed: boolean;
    specialFixed: boolean;
    common: boolean;
    gridComputed: boolean;
    postComputed: boolean;
    fieldType?: number;
    descriptionAr?: string;
    minValue: number;
    maxValue: number;
}

export interface PElement {
    id: number;
    employee: number;
    payMonth: number;
    center: number;
    maritalStatus: number;
    vacationPeriod?: number;
    fund2?: number;
    fund1?: number;
    bankRib?: string;
    clearancePayment?: boolean;
    e998?: number;
    e999?: number;
    payMode?: number;
    bank?: number;
    accountNo?: string;
}

export const ELEMENT_TYPE_URL = '/payroll/elementtypes';
export const ELEMENT_LOANS_URL = '/payroll/loan-types';

export class ElementType {
    id: number;
    description: string;
    field?: string;
    fieldId?: number;
    fieldName?: string
}

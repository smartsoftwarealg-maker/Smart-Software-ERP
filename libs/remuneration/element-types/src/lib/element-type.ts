export const ELEMENT_TYPE_URL = '/payroll/elementtypes';

export class ElementType {
    id: number;
    description: string;
    field?: string;
    fieldId?: number;
    fieldName?: string
}

export const ELEMENTSINFO_URL = '/payroll/elementsinfo';

export interface ElementsInfo {
    id: number;
    field: string;
    description: string;
    fixed: boolean;
    collective: boolean;
    gridComputed: boolean;
    postComputed: boolean;
    fieldType?: number;
    descriptionAr?: string;
    minValue: number;
    maxValue: number;
}

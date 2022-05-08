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

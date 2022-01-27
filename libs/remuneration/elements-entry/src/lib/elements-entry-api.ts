import {ImageModel} from '@ss/common/ui-image-input';

export const INPUT_ELEMENTS_URL = '/payroll/pay-elements';
export const FIXED_ELEMENTS_URL = '/payroll/fix-elements';

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
    imageModel?: ImageModel;
}

export interface MJournal {
    id: number;
    firstName: string;
    lastName: string;
    data: number[];
}

export interface Journal {
    headers: string[];
    data: MJournal[];
}

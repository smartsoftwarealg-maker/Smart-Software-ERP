
export const MARKS_URL = '/articles/marks';
export const VATS_URL = '/articles/vats';

export interface Mark {
    id: number;
    description: string;
}

export interface Vat {
    id: number;
    value: number;
}

export const WILAYAS_URL = '/wilayas';
export const VATS_URL = '/articles/vats';


export interface Wilaya {
    id: number;
    description: string;
}

export interface Vat {
    id: number;
    value: number;
}

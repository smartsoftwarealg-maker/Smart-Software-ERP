
export const MARKS_URL = '/articles/marks';
export const VATS_URL = '/articles/vats';
export const CLASSES_URL = '/articles/classes';
export const SUBCLASSES_URL = '/articles/subclasses';
export const STORE_NAMES_URL = '/articles/storenames';
export const UNITS_URL = '/articles/lookups/units'; // todo: find the real url

export interface Mark {
    id: number;
    description: string;
}

export interface Vat {
    id: number;
    value: number;
}

export interface Class {
    id: number;
    description: string;
}

export interface Subclass {
    id: number;
    description: string;
}

export interface StoreName {
    id: number;
    description: string;
}

export interface Unit {
    id: number;
    description: string;
}


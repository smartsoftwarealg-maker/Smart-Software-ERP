
export const MARKS_URL = '/articles/marks';
export const CLASSES_URL = '/articles/classes';
export const SUBCLASSES_URL = '/articles/subclasses';
export const STORE_NAMES_URL = '/articles/storenames';
export const UNITS_URL = '/units'; // todo: add to backend because it is missing

export interface Mark {
    id: number;
    description: string;
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


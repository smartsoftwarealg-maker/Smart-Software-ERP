
export const MARKS_URL = '/articles/marks';
export const VATS_URL = '/articles/vats';
export const CLASSES_URL = '/articles/classes';
export const SUBCLASSES_URL = '/articles/subclasses';

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


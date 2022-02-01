
export const DIVISIONS_URL = '/organizations/divisions';
export const DEPARTMENTS_URL = '/organizations/departments';
export const SERVICES_URL = '/organizations/services';

export interface Department {
    id: number;
    description: string;
}

export interface Division {
    id: number;
    description: string;
}

export interface Service {
    id: number;
    description: string;
}

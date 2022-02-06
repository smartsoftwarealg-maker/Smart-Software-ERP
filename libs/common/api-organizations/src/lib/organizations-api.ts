
export const DIVISIONS_URL   = '/organizations/divisions';
export const DEPARTMENTS_URL = ['/organizations/divisions/', '/departments'];
export const SERVICES_URL    = ['/organizations/departments/', '/services'];
export const OFFICES_URL     = ['/organizations/services/', '/offices'];

export interface Division {
    id: number;
    description: string;
}

export interface Department {
    id: number;
    description: string;
    division: number;
}

export interface Service {
    id: number;
    description: string;
    department: number;
}

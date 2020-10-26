
export const WILAYAS_URL = '/wilayas';
export const VATS_URL = '/articles/vats';
export const MARITAL_STATUS_URL = '/mstatus';
export const NATIONALITIES_URL = '/nationalities';
export const EDUCATION_LEVEL_URL = '/educlevels';
export const DIPLOMAS_URL = '/diplomas';
export const POSTS_URL = '/posts';
export const CATEGORIES_URL = '/categories';
export const SERVICES_URL = '/services';


export interface Wilaya {
    id: number;
    description: string;
}

export interface Vat {
    id: number;
    value: number;
}

export class MaritalStatus {
    id: number;
    description: string;
}

export class Nationality {
    id: number;
    description: string;
}

export class EducationLevel {
    id: number;
    description: string;
}

export class Diploma {
    id: number;
    description: string;
}

export class Post {
    id: number;
    description: string;
}

export class Category {
    id: number;
    description: string;
}

export class Service {
    id: number;
    description: string;
}

export class MilitaryServiceState {
    id: number;
    description: string;
}

export const MILITARY_SERVICE_STATES: MilitaryServiceState[] = [
    {id: 0, description: 'PAYROLL_MSRV_FREEMAN'},
    {id: 1, description: 'PAYROLL_MSRV_ENSLAVED'},
    {id: 2, description: 'PAYROLL_MSRV_EXEMPTED'},
    {id: 3, description: 'PAYROLL_MSRV_UNFIT'}
];

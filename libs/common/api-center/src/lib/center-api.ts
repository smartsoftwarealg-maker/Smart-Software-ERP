export const CENTER_URL = '/centers';
export const COMPANY_URL = '/companies';

export interface Center {
    id: number;
    description: string;
}

export interface Company {
    id: number;
    description: string;
    address: string;
    descriptionAr: string;
}



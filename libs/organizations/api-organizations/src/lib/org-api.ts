
export const ORGANIZATION_URL = '/organizations/organizations';

export interface Organization {
    id: number;
    center: number;
    parentId?: number;
    division?: number;
    department?: number;
    service?: number;
    office?: number;
}

export interface Lookup {
    id: number;
    description: number;
    descriptionAr: number;
    responsible: number;
}
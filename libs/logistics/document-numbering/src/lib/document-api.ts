export const DEFINITION_URL = '/lookups/definitions';
export const DOCUMENTS_URL = '/documents';


export interface LDocument {
    id: number;
    centerId: number;
    code: number;
    startNumber: number;
    footer?: string;
    lock_on_print: boolean;
    description?: string;
}

export class Definition {
    id: number;
    description: string;
}

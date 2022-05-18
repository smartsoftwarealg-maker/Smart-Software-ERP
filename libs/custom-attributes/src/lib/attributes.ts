export const ATTRIB_MODULES_URL = '/modules';
export const ATTRIB_TEMPL_URL = '/attributes';
export const ATTRIB_VALUES_URL = '/values';

export interface AttribTempl {
    id: number;
    description: string;
    attType: number;
    moduleId: number;
}

export interface AttribVal {
    id: number;
    code: number;
    description: string;
}

export interface Attrib {
    id: number;
    attribCode: number;
    stringVal?: string;
    numericVal?: number;
    lookupVal?: number;
    dateVal?: Date;
    transacId?: number;
    articleId?: number;
    assetId?: number;
}

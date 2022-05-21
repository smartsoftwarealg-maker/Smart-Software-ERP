import {ExtraEntryPointObject} from '@angular-devkit/build-angular';

export const ATTRIB_MODULES_URL = '/modules';
export const ATTRIB_TEMPL_URL = '/attributes';
export const ATTRIB_VALUES_URL = '/values';

export const PARENT_ARTICLE = 1;
export const PARENT_ASSET   = 2;
export const PARENT_TRANSAC = 3;

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
    attribName?: string;
    attribType?: number;
    valueName?: string;
    value?: string | number | Date;
}

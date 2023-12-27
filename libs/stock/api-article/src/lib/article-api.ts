import {ImageModel} from '@ss/common/ui-image-input';

export const USERS_URL = '/users';
export const STORES_URL = '/stores';
export const ARTICLES_URL = '/articles';
export const SERVICE_ARTICLES_URL = '/articles/services';
export const APP_URL = '/apps';
export const AVAILABLE_ARTICLES_URL = '/articles/available';
export const ARTICLE_IMAGE_URL = '/image';
export const BOM_TREE_URL = '/articles/tree';
export const BOM_URL = '/boms';



export interface BOM {
    id: number;
    parentId?: number;
    childId: number;
    qty: number;
    price?: number;
    parentRef?: string;
    parentDescription?: string;
    childRef?: string;
    childDescription?: string;
}

export interface BOMTree {
    bom: BOM;
    children: BOMTree[];
}

export interface Article {
    id: number;
    reference: string;
    description2: string;
    mark: number;
    klass: number;
    vat: number;
    accountno: string;
    price1: number;
    awp?: number;
    appId: number;
    salesUnit: number;
    imageModel?: ImageModel;
    markDescrip?: string;
    unitDescrip?: string;
    vatValue?: number;
    notForSale: boolean;
    blocked: boolean;
    classDescription?: string;
    markDescription?: string;
    minQty?: number;
    maxQty?: number;
    unitDescription?: string;
}

export interface QtyPrice {
    document: number;
    qty: number;
    price: number;
}

export interface UserStore {
    id: number;
    userId: number;
    storeId: number;
    storeDescription?: string;
}

export interface AvailableArticle {
    articleDescription: string;
    stock: number;
    price: number;
    storeId: number;
    partId: number;
    imageModel?: ImageModel;
    qty?: number;
}

export interface AvailableStock {
    classId: number;
    classDescription: string;
    articles: AvailableArticle[];
}

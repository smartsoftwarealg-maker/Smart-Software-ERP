import {ImageModel} from '@ss/common/ui-image-input';

export const USERS_URL = '/users';
export const STORES_URL = '/stores';
export const ARTICLES_URL = '/articles';
export const SERVICE_ARTICLES_URL = '/articles/services';
export const APP_URL = '/apps';
export const AVAILABLE_ARTICLES_URL = '/articles/available';
export const ARTICLE_IMAGE_URL = '/image';

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
    klassName?: string;
    markName?: string;
    minQty?: number;
    maxQty?: number;
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

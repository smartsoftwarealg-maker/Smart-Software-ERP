import {ImageModel} from "@ss/common/ui-image-input";

export const ARTICLES_URL = '/articles';
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
    appCode: number;
    imageModel?: ImageModel;
}

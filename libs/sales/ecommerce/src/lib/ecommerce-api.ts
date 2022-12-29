import {AvailableArticle} from '@ss/stock/api-article';

export interface ADImage {
    id: number;
    description: string;
    descriptionAr?: string;
    imageBlob?: Blob;
    imageSrc?: string;
}

export interface Product {
    storeId: number;
    qty:     number;
    price:   number;
}

export interface Confirmation {
    lastName:  string;
    firstName: string;
    address:   string;
    lines: Product[];
}

export const ARTICLE_LOTS_URL = '/lots';
export const ARTICLE_STORE_URL = '/stores';

export interface ArticleLot {
    id: number;
    description: string;
}

export interface Stores {
    id: number;
    centerId: number;
    description: string;
}
export interface ArticleStore {
    id: number;
    storeId: number;
    referenceId: number;
    reference: string;
    stock?: number;
    pp?: number;
    price1: number;
    price2: number;
    price3: number;
    price4: number;
    price5: number;
    inventPMP?: number;
    inventStock?: number;
    theoStock?: number;
    blockedLot: boolean;
    storeName?: string;
}


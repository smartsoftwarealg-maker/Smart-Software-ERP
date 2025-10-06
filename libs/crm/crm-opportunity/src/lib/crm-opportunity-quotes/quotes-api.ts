export interface CRMQuote {
    id: number;
    parentId: number; // opportunity_id
    center: number;
    document: number;
    number: number;
    agent: number;
    userId: number;
    date: Date;
    currency?: number;
    currencyRate: number;
    locked: boolean;
    dealer?: number;
}

export interface CRMQuoteItem {
    id: number;
    parentId: number; // quote_id
    reference: string;
    quantity: number;
    listPrice: number;
    unitPrice: number;
    discount?: number;
    footerMemo?: string;
    productDescription?: string;
}

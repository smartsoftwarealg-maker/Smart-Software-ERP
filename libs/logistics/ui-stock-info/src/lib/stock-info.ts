export const STOCK_INFO_URL = '/stores';
export interface StockInfo {
    reference: string;
    description?: string;
    store: string;
    stock: number;
    price1: number;
    price2: number;
    price3: number;
    price4: number;
    price5: number;
}

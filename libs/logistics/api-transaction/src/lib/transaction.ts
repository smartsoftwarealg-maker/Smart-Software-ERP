export interface Transaction {
    id: number;
    center: number;
    document: number;
    number: number;
    date: string;
    agent: number;
    userID: number;
    dealer: number;
    header: string;
    footer: string;
    reference: string;
    referenceDocDate: string;
    payMethod: number;
    locked: string;
    creationTime: string;
    discountDescription?: string;
    fixedDiscount?: number;
    fixedDiscountVAT?: number;
    currency?: number;
    currencyRate: number
}

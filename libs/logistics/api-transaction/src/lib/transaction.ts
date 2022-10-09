export interface Transaction {
    id: number;
    centerId: number;
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
    currencyRate: number;
    dirty: boolean;
    dealerName?: string;
    agentName?: string;
    payMethodName?: string;
    project?: number;
    projectDescription?: string;
}

import { Lookup } from '@ss/common/api-lookup';


export interface Transaction {
    id: number;
    centerId: number;
    document: number;
    number: number;
    date: Date;
    agent: number;
    userID: number;
    dealer: number;
    header: string;
    footer: string;
    reference: string;
    referenceDocDate: Date;
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
    docStatus?: string;
    isValidated: boolean;
}

export interface ExtraCost {
    id: number;
    parentId: number;
    reference: string;
    description?: string;
    transactDate: Date;
    amount: number;
    vat: number;
    agent?: number;
    invoiceNo?: string;
    foreignCurrency: boolean;
    costType: number;
    valueType: number;
    exchangeRate: number;
    supplierName?: string;
    costName?: string;
    valueName?: string;
}

export const COST_TYPES: Lookup[] = [
    { id: 1, description: 'LOGISTICS_FREIGHT' },
    { id: 2, description: 'LOGISTICS_INSURANCE' },
    { id: 3, description: 'LOGISTICS_CAF' },
    { id: 4, description: 'LOGISTICS_CUSTOMS' },
    { id: 5, description: 'LOGISTICS_TRANSIT' },
    { id: 6, description: 'LOGISTICS_PRICE_DISCOUNT' }
];

export const VALUE_TYPES: Lookup[] = [
    { id: 1, description: 'COMMON_AMOUNT' },
    { id: 2, description: 'COMMON_RATE' },
];

export const COSTS_URL = '/costs';
export const TRANSACTIONS_URL = '/transactions';
export const IMPORT_PURCHASE_URL = '/ireception';

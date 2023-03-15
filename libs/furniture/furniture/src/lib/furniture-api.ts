export const FURNITURE_RECEIVER     = '/locations';
export const FURNITURE_RECEPTIONS   = '/furniture/receptions';
export const FURNITURE_SALES        = '/furniture/sales';
export const FURNITURE_TRANSACTIONS = '/furniture/transactions';
export const FURNITURE_ASSIGNMENTS = '/furniture/assignments';
export const FURNITURE_DETAIL       = '/detail';
export const FURNITURE              = '/furniture/furniture';

export interface FurnitureReceiver {
    id: number;
    centerId: number;
    description: string;
}

export interface Furniture {
    id: number;
    centerId: number;
    reference: string;
    description?: string;
    memo?: string;
    serialNo?: string;
    supplier?: number;
    receiver?: number;
    dateOut?: Date;
    acquisitionValue: number;
    acquisitionDate?: Date;
    accountNo?: string;
    status?: number;
    invoiceNo?: string;
    furnitureType?: number;
    mark?: number;
    os?: number;
    isMultifunctional: boolean;
    supplierDescription?: string;
    statusDescription?: string;
    markDescription?: string;
    osDescription?: string;
}

export interface FurnitureTransactionDetail {
    id: number;
    parentId: number;
    furniture: number;
    qty: number;
    price?: number;
    description?: string;
}

export interface FurnitureTransaction {
    id: number;
    centerId: number;
    document: number;
    number: number;
    date?: string;
    supplier?: number;
    requester?: string;
    orderNo?: string;
    office?: number;
    invoiceNo?: string;
    supplierDescription?: string;
}

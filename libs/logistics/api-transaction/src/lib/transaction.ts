import { Lookup } from '@ss/common/api-lookup';

export const DOC_SEPARATOR_512 = 512;
export const DOC_SEPARATOR_200 = 200;
export const DOC_SEPARATOR_800 = 800;
export const DOC_FREE_INVOICE = 1;
export const DOC_PURCHASE_ORDER = 2;
export const DOC_SUPPLIER_QUOTATION = 4;
export const DOC_PRICE_INQUIRY = 5;
export const DOC_QUOTATION = 6;
export const DOC_PART_REQUEST = 8;
export const DOC_PRODUCTION_ORDER = 9;
export const DOC_PURCHASE_REQUEST = 10;
export const DOC_TRANSFER_ORDER = 15;
export const DOC_WORK_REQUEST = 12;
export const DOC_WORK_ORDER = 15;
export const DOC_PRODUCTION_ORDER_DETAIL = 11;
export const DOC_MANUFACTURING = 12;
export const DOC_ORDER_INTEGRATION = 14;
export const DOC_CORRECTION_IN = 767;
export const DOC_INVENTORY = 519;
export const DOC_CORRECTION_OUT = 511;
export const DOC_DELIVERY = 257;
export const DOC_INVOICE = 258;
export const DOC_MAINT_ORDER = 261;
export const DOC_RESERVATION = 264;
export const DOC_PRODUCTION_DETAIL = 263;
export const DOC_PRODUCTION_RESERVATION = 267;
export const DOC_TRANS_ORDER_CONSUMPTION = 266;
export const DOC_TRANSFER_OUT = 259;
export const DOC_DELIVERY_CANCELLATION = 517;
export const DOC_PART_TRANSFER = 510;
export const DOC_INVOICE_CANCELLATION = 515;
export const DOC_RECEPTION = 514;
export const DOC_RECEPTION_CANCELLATION = 262;
export const DOC_PRODUCTION = 518;
export const DOC_RESERVATION_CANCELLATION = 520;
export const DOC_TRANSFER = 259;
export const DOC_TRANSFER_RECEPTION = 516;
export const DOC_SUPP_QUOTATION = 4;
export const DOC_SALES_ORDER = 1025;
export const DOC_PAYMENT_ORDER = 1030;
export const DOC_TRANSFER_CANCELLATION = 513;
export const DOC_CONSUMPTION_CANCELLATION = 521;
export const DOC_QUALITY_CONTROL = 270;
export const DOC_PRODUCTION_RECEPTION = 271;
export const DOC_QUALITY_CONTROL2 = 272;
export const DOC_TRANSFER_IN = 524;
export const DOC_EXTRA_COSTS = 530;
export const DOC_ASSET_RECEPTION = 531;
export const DOC_HOLIDAY_REQUEST = 3000;
export const DOC_CONSUMPTION = 260;
export const DOC_AUTO_DELIVERY = 268;
export const DOC_INTER_STORE_TRANSFER = 269;
export const DOC_IMPORT_RECEPTION = 514;
export const DOC_ASSET_APPOINTMENT = 1010;
export const DOC_ACCOUNTING_OPR = 4096;

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
    discount?: number;
    fixedDiscount?: number;
    fixedDiscountVAT?: number;
    currency?: number;
    currencyRate: number;
    dirty: boolean;
    dealerName?: string;
    altAgent?: string;
    agentName?: string;
    payMethodName?: string;
    project?: number;
    projectDescription?: string;
    docStatus?: string;
    isValidated: boolean;
    transporter?: number;
    driver?: string;
    license?: string;
    licenseDate?: Date;
    licenseIssuer?: string;
    plateNumber?: string;
    plateNumber2?: string;
    deliveryTime?: number;
    vfGuarantee?: number;
    ftGuarantee?: number;
    advancement?: number
    advancementFT?: number
    receptionType?: number;
    supplierAccount?: number;
    shipMode?: number;
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
    stamp?: number;
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

export interface  InterStoreTransfer {
    id: number;
    center: number;
    agent: number;
    document: number;
    number: number;
    date: Date;
    locked: boolean;
    userId?: number;
    header?: string;
    footer?: string;
    reference?: string;
    dirty: boolean;
    docStatus?: number;
    creationTime: Date;
    validated: boolean;
    storeId?: number;
    storeDescription?: string;
}

export interface InterStoreTransferLine {
    id: number;
    parentId: number;
    rightId: number;
    sourceRef: string;
    sourceDescription?: string;
    sourceStore?:number;
    qty: number;
    destinationRef: string;
    destinationDescription?: string;
    destinationStore?:number;
    storeDescription?: string;
    lotDescription?: string;
}

export const COSTS_URL = '/costs';
export const TRANSACTIONS_URL = '/transactions';
export const IMPORT_PURCHASE_URL = '/ireception';
export const INTER_STORE_TRANSFER_URL = '/store-transfers';
export const DETAIL_URL = '/detail';

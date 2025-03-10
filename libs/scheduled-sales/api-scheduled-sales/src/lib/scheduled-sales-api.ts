import {ImageModel} from '@ss/common/ui-image-input';

export const SS_PROJECT_URL     = '/projects';
export const SS_ARTICLE_URL     = '/ssales/articles';
export const SS_SCHEDULE_URL    = '/schedules';
export const SS_QUOTA_URL       = '/ssales/quotas';
export const SS_AGENT_QUOTA_URL       = '/quotas';
export const SS_MODE_URL        = '/ssales/modes';
export const SS_TRUCK_URL       = '/ssales/trucks';
export const SS_CONTRACT_URL    = '/ssales/supplier-contracts';
export const SS_SCHEDULE_AGENTS = '/ssales/agents';
export const SS_PAYMENTS = '/ssales/payments';
export const SS_DIRECT_PAYMENTS = '/ssales/direct-payments';
export const SS_AGENTS = '/ssales/agents';


export interface SSProject {
    id: number;
    parentId: number;
    centerId: number;
    description?: string;
    project_code?: string;
    creation_date?: Date;
    start_date?: Date;
    finish_date?: Date;
    pClass?: number;
    qty: number;
    monthly_rate?: number;
    scheduled_qty?: number;
    activity?: number;
    sector?: number;
    wilaya?: number;
    master_work?: number;
    user_id?: number;
    blocked: boolean;
    contract_number?: string;
    contract_date?: Date;
    ods?: string;
    representative?: string;
    represent_status?: string;
    requested_qty?: number;
    proj_priority?: number;
    product_type?: number;
    amount?: number;
    memo?: string;
    ods_date?: Date;
    duration?: number;
    dailyRate?: number;
    salesPrice?: number;
    product_id?: number;
    denomination?: string;
    className?: string;
    activityName?: string;
    sectorName?: string;
    wilayaName?: string;
    typeName?: string;
}

export interface Article {
    id: number;
    reference: string;
    description1?: string;
    description2?: string;
    price1?: number;
    price2: number;
    price3: number;
    discount?: number;
    appId?: number;
    blocked: boolean;
    discountable: boolean;
    accountNo?: string;
    rgb: number;
    vat?: number;
    aType?: number;
    pClass?: number;
    unit?: number;
    imageModel?: ImageModel;
    classDescription?: string;
    typeDescription?: string;
    unitDescription?: string;
    vatValue?: number;
}

export interface Qty {
    pType: number;
    qty: number;
}

export interface Quota {
    id: number;
    centerId: number;
    salesDate?: Date;
    agentId?: number;
    productId?: number;
    exworks: boolean;
    qty: number;
    discountType?: number;
    discount: number;
    canceled: number;
    discount_2: number;
    discount_3: number;
    reference?: string;
    description?: string;
    customerCode?: string;
    customerName?: string;
    price?: number;
}

export interface Schedule {
    id: number;
    autogenId?: number;
    serialNumber: number;
    salesDate: Date;
    centerId: number;
    parentId: number;
    productRef?: string;
    productId?: number;
    qty: number;
    price: number;
    vat: number;
    projectId?: number;
    userId: number;
    salesId?: number;
    canceled: boolean;
    creationDate: Date;
    tareWeight: number;
    payMethod?: number;
    chkNumber?: string;
    chkBank?: string;
    bankLocation?: string;
    chkAmount?: number;
    chkDate?: Date;
    transporter?: string;
    plateNumber?: string;
    chainNumber?: string;
    idNumber?: string;
    orderNo?: string;
    commRegister?: string;
    memo?: string;
    tareTime?: Date;
    discount: number;
    isPrinted: boolean;
    hostName?: string;
    loadingLine?: number;
    discountType?: number;
    printDate?: Date;
    destination?: string;
    brut_time?: Date;
    brut_userid?: number;
    is_refund: boolean;
    brutWeight?: number;
    transporterId?: number;
    segment_id?: number;
    segment_price?: number;
    mode?: number;
    iDestination?: number;
    timeOut?: Date;
    timeIn?: Date;
    isDesktop: boolean;
    customerCode?: string;
    customerName?: string;
    productDescription?: string;
    invoiceNo?: number;
}

export interface SalesMode {
    id: number;
    description: string;
    daysAhead: number;
}

export interface SupplierTruck {
    id: number
    supplier?: number;
    plateNumber?: string;
    supplierName?: string;
    supplierCode?: string;
}

export interface TruckContract {
    id: number;
    truckId: number;
    reference?: string;
    contractDate?: string;
    fromDate?: string;
    toDate?: string;
}

export interface Balance {
    debit: number;
    credit: number;
    balance: number;
}
export interface ScheduleBalance {
    missed: number;
    invoiced: number;
    pending: number;
}

export interface SalesRecord {
    id: number;
    date: Date,
    number: number;
    product: string;
    qty: number;
    price: number;
    transporter?: string;
    licenseNo?: string;
    plateNumber?: string;
}

export interface Joint {
    salesId: number;
    paymentId: number;
    agentId?: number;
}

export interface Payment {
    id: number;
    centerId: number;
    agentId: number;
    date: Date,
    payMethod: number;
    document: number;
    amount: number;
    chkNumber?: string;
    bankId?: number;
    chkBank?: string;
    chkDate?: string;
    memo?: string;
    scheduleId?: number;
    validated: boolean;
    destBank?: number;
    creationTime: Date;
    cash: number;
    compensation: number;
    payMethodDescription?: string;
    customerCode?: string;
    agentDescription?: string;
    bankDescription?: string;
}

export interface Turnover {
    id: number;
    turnover: number;
}

export interface Quantities {
    id: number;
    qty: number;
    scheduled: number;
    remaining: number;
}

export interface ValidatedSale {
    id: number;
    centerId: number;
    serialNumber: number;
    date: Date;
    customerCode: string;
    denomination: string;
    reference: string;
    description: string;
    quantity: number;
    validationTime?: Date;
    receiverId?: number;
    receiverDescription?: string;
}

export interface SalesPoll {
    id: number;
    centerId: number;
    number?: number;
    date: Date;
}

export interface CustomerPoll {
    id: number;
    parentId: number; //Poll id
    customerId: number;
    questionId: number;
    satisfactionAnswer?: number;
    pollAnswer?: string;
    memo?: string;
    questionDescription?: string;
    numberDescription?: number;
    dateDescription?: Date;
}

export interface PollQuestion {
    id: number;
    description: string;
    descriptionAr?: string;
    descriptionEn?: string;
    answerType: number;
    showMemo: boolean;
}

import {ImageModel} from '@ss/common/ui-image-input';

export const SS_PROJECT_URL  = '/ssales/projects';
export const SS_ARTICLE_URL  = '/ssales/articles';
export const SS_SCHEDULE_URL = '/schedules';
export const SS_QUOTA_URL    = '/ssales/quotas';
export const SS_SCHEDULE_AGENTS  = '/ssales/agents';


export interface SSProject {
    id: number;
    agentId: number;
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
}

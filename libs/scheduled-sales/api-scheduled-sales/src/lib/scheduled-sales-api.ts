import {ImageModel} from '@ss/common/ui-image-input';

export const SS_PROJECT_URL = '/ssales/projects';
export const SS_ARTICLE_URL = '/ssales/articles';

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

export const ASSETS_URL = '/assets';
export const COST_URL = '/costs';
export const BLOCKING_URL = '/blocking';
export const REVALUATION_URL = '/revaluations';
export const COST_TYPE_URL = '/lookups/invest_costtypes';
export const REVALUATION_TYPE_URL = '/lookups/revaluations';

export interface Asset {
    id: number;
    parent_id?: number;
    reference: string;
    reference2?: string;
    centerId: number;
    accountno: string;
    description?: string;
    info?: string;
    acquisitionDate?: string;
    serviceDate?: string;
    invoiceNumber?: string;
    itemCount?: number;
    acquisitionValue: number;
    historicValue: number;
    vat: number;
    depreciationRate: number;
    decliningRate: number;
    depreciationType: number;
    residualValue: number;
    supplier?: number;
    originalSupplier?: number;
    barcode?: string;
    dateOut?: string;
    customer?: string;
    serial_no?: string;
    location?: number;
    costCenter?: number;
    investEnd?: number;
    startYear?: number;
    receptionNumber?: string;
    receptionDate?: number;
    positionNumb?: string;
    modelNumb?: string;
    installation_code?: string;
    tech_specific?: string;
    comment?: string;
    order_numb?: string;
    order_date?: string;
    office?: number;
    sales_price: number;
    creation_date?: string;
    investment_type?: number;
    useful_life: number;
    ecomomic_life: number;
    old_depreciation: number;
    outof_service: boolean;
    criticity?: number;
}

export interface Depreciation {
    year: number;
    depreciation: number;
    totalDepreciation: number;
    remaining: number;
}

export interface AssetCost {
    id: number;
    cost_type: number;
    invest_id: number;
    cost_id?: number;
    amount: number;
    typeDescription?: string;
}

export interface AssetRevaluation {
    id: number;
    invest_id: number;
    reval_nature: number;
    reval_type?: number;
    deprec_year: number;
    useful_life: number;
    amount: number;
    deprec_rate: number;
    typeDescription?: string;
}

export interface Blocking {
    id: number;
    investId: number
    fromDate: Date;
    toDate: Date;
}

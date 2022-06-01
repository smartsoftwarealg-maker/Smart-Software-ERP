export const ASSETS_URL = '/assets';
export const ASSET_CLASS_URL = '/asset-classes';
export const APPOINTMENT_URL = '/appointments';
export const COST_URL = '/costs';
export const ATTRIBUTE_URL = '/attributes';
export const LOCATIONS_URL = '/locations';
export const BLOCKING_URL = '/blocking';
export const REVALUATION_URL = '/revaluations';
export const COST_TYPE_URL = '/lookups/invest_costtypes';
export const REVALUATION_TYPE_URL = '/lookups/revaluations';
export const ASSET_RECEPTIONS_URL = '/asset-receptions';

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
    depreciationRate?: number;
    decliningRate?: number;
    depreciationType?: number;
    residualValue: number;
    supplier?: number;
    originalSupplier?: number;
    barcode?: string;
    dateOut?: string;
    customer?: number;
    serial_no?: string;
    location?: number;
    costCenter?: number;
    investEnd?: number;
    startYear?: number;
    receptionNumber?: string;
    receptionDate?: string;
    positionNumb?: string;
    modelNumb?: string;
    installation_code?: string;
    tech_specific?: string;
    comment?: string;
    order_numb?: string;
    order_date?: string;
    office?: number;
    sales_price?: number;
    creation_date?: string;
    investment_type?: number;
    useful_life: number;
    old_depreciation: number;
    outof_service: boolean;
    criticity?: number;
    accountId?: number;
    ccCode?: string;
    assetClass?: number;
    className?: string;
}

export interface Depreciation {
    year: number;
    depreciation: number;
    totalDepreciation: number;
    remaining: number;
}
export interface AssetLocation {
    id: number;
    description: string;
    centerId: number;
    code?: string;
    structure?: number;
    bar_code?: number;
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

export interface AssetClass {
    id: number;
    description:       string,
    descriptionAr?:    string;
    depreciationRate?: number;
    usefulLife?:       number;
}

export interface ASSAppointment {
    id: number
    invest_id: number;
    decision_date?: Date;
    decision_ref?: string;
    location?: number;
    cost_center?: number;
    office_id?: number;
    invent_id: number;
    officeCode?: string;
}

export interface AssetReception {
    id: number;
    acquisition_Date: Date;
    invoice_Number?: string;
    supplier?: string;
}

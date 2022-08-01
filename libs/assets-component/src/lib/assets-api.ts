export const ASSETS_URL = '/assets';
export const ASSETS_BUILDING_URL = '/buildings';
export const ASSET_CLASS_URL = '/asset-classes';
export const APPOINTMENT_URL = '/appointments';
export const COST_URL = '/costs';
export const ATTRIBUTE_URL = '/attributes';
export const LOCATIONS_URL = '/locations';
export const BLOCKING_URL = '/blocking';
export const REVALUATION_URL = '/revaluations';
export const COST_TYPE_URL = '/lookups/invest_costtypes';
export const BLOCKING_TYPE_URL = '/lookups/blocking_types';
export const REVALUATION_TYPE_URL = '/lookups/revaluations';
export const ASSET_RECEPTIONS_URL = '/asset-receptions';
export const ASSET_APPOINTMENT_URL = '/asset-appointments';
export const ASSET_APPOINTMENT_LINE_URL = '/lines';
export const ASSET_INVENTORY_URL = '/inventories';
export const ASSET_YEARS_URL = '/years';

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
    supplierName?: string;
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
    decisionNumber?: string;
    decisionDate?: Date;
    investId: number
    fromDate: Date;
    toDate: Date;
    blockingType?: number;
    typeDescription?: string;
}

export interface AssetClass {
    id: number;
    description: string,
    descriptionAr?: string;
    depreciationRate?: number;
    usefulLife?: number;
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
    agentId?: number;
    denomination?: string;
    reappointment: boolean
}

export interface AssetReception {
    id: number;
    acquisition_Date: Date;
    invoice_Number?: string;
    supplier?: string;
}

export interface ASSAppointmentHeader {
    id: number;
    center: number;
    serialNumber: number;
    date: Date;
    officeId?: number;
    officeName?: string;
    requesterId?: number;
    requestDate?: Date;
    requestNumber?: string;
    beneficiaryId?: number;
    requester?: string;
    beneficiary?: string;
    activity?: string;
    reappointment: boolean;
}

export interface AssetAppointmentLine {
    id: number;
    appointmentId: number;
    assetId: number;
    reference?: string;
    description?: string;
}

export interface AssetInventory {
    id: number;
    centerId: number;
    investId: number;
    office?: number;
    inventYear: number;
    date?: Date;
    inventMemo?: string;
    status?: number;
    inventId?: number;
    userId?: number;
    officeDescription?: string;
    assetDescription?: string;
}

export interface AssetBuilding {
    id: number;
    centerId: number;
    code: string;
    description: string;
}

import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Office} from '@ss/common/api-lookup';
import {BaseEntityService} from '@ss/common/api-base-entity';

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
export const END_TYPE_URL = '/lookups/investment_ends';
export const REVALUATION_TYPE_URL = '/lookups/revaluations';
export const ASSET_RECEPTIONS_URL = '/asset-receptions';
export const ASSET_APPOINTMENT_URL = '/asset-appointments';
export const ASSET_APPOINTMENT_LINE_URL = '/lines';
export const ASSET_INVENTORY_URL = '/inventories';
export const ASSET_YEARS_URL = '/years';
export const ASSET_DEPRECIATION_RATES = '/rates';

export interface Asset {
    id: number;
    parent_id?: number;
    reference: string;
    reference2?: string;
    centerId: number;
    accountno: string;
    description?: string;
    acquisitionDate?: string;
    serviceDate?: string;
    itemCount?: number;
    acquisitionValue: number;
    historicValue: number;
    vat: number;
    depreciationRate?: number;
    decliningRate?: number;
    depreciationType?: number;
    residualValue: number;
    dateOut?: string;
    customer?: number;
    serial_no?: string;
    location?: number;
    costCenter?: number;
    investEnd?: number;
    startYear?: number;
    tech_specific?: string;
    comment?: string;
    office?: number;
    sales_price?: number;
    creation_date?: string;
    investment_type?: number;
    useful_life: number;
    old_depreciation: number;
    outOfService: boolean;
    criticity?: number;
    accountId?: number;
    ccCode?: string;
    assetClass?: number;
    className?: string;
    status?: number;
    geolocation?: string;
    beneficiary?: string;
    receptionId?: number;
    receptionNumber?: string;
    receptionDate?: Date;
    requestNumber?: string;
    requestDate?: Date;
    orderNumber?: string;
    orderDate?: Date;
    deliveryNumber?: string;
    deliveryDate?: Date;
    invoiceNumber?: string;
    invoiceDate?: Date;
    supplier?: string;
    originalSupplier?: string;
    requester?: number;
    mark?: number;
    site?: string;
    building?: string;
    beneficiaryId?: number;
    appointmentNumber?: number;
    isFinal?: number;
    reserviceDate?: Date;
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
    id: number;
    parentId: number;
    date?: Date;
    number?: string;
    location?: string;
    code?:  string;
    beneficiary?:  string;
}

export interface AssetReception {
    id: number;
    centerId: number;
    serialNumber: number;
    receptionDate: Date;
    requester?: number;
    supplier?: number;
    origSupplier?: number;
    requestNumber?: string;
    orderNumber?: string;
    deliveryNumber?: string;
    invoiceNumber?: string;
    requestDate?: Date;
    orderDate?: Date;
    deliveryDate?: Date;
    invoiceDate?: Date;
    count: number;
    amount?: number;
    supplierName?: string;
    origSupplierName?: string;
    modifiedBy?: number;
    creatorName?: string;
    modifierName?: string;
    requesterName?: string;
    memo?: string;
    status?: string;
    validated?: boolean
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
    site?: string;
    building?: string;
    modifiedBy?: number;
    creatorName?: string;
    modifierName?: string;
    validated?: boolean;
    status?: string;
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
    statusDescription?: string;
}

export interface AssetBuilding {
    id: number;
    locationId: number;
    code: string;
    description: string;
    location?: string;
}

export interface SearchCriteria {
    reference?: string;
    reference2?: string;
    description?: string;
    accountNo?: string;
    acquisitionDate?: Date;
    serviceDate?: Date;
    invoiceNumber?: string;
    acquisitionValue?: number;
    supplier?: string;
    dateOut?: string;
    serialNo?: string;
    location?: number;
    investEnd?: number;
    receptionNumber?: string;
    receptionDate?: Date;
    orderNumb?: string;
    orderDate?: Date;
    requester?: number;
    consolidated?: boolean;
}

export interface DepreciationRate {
    id: number;
    parentId: number;
    year: number;
    rate: number;
}

export class OfficeAutoComplete extends DefaultAutoCompleteModel<Office> {
    constructor(public override entitySrv: BaseEntityService<Office>) {
        super(entitySrv, 'id', 'description');
    }

    override toString = (x:Office) => x ? `${x.description.substring(0, 50)} ${x.code? '(' + x.code + ')' : ''}`  : null;
}

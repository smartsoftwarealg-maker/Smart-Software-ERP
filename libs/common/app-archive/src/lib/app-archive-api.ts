import { Lookup } from "@ss/common/api-lookup";

export const AGENT_ARCHIVES            = 1;
export const ASSET_RECEPTIONS_ARCHIVES = 2;
export const ASSET_ARCHIVES            = 3;
export const EMPLOYEE_ARCHIVES         = 4;
export const DOCUMENT_ARCHIVES         = 5;
export const CONTRACT_ARCHIVES         = 6;
export const ACC_TRANSACTION_ARCHIVES  = 7;
export const CMMS_ROUTING_ARCHIVES     = 8;
export const PARK_ARCHIVES             = 9;
export const PART_ARCHIVES            = 10;
export const DRIVER_ARCHIVES          = 11;
export const VEHICLE_ARCHIVES         = 12;
export const TREASURY_ARCHIVES        = 13;
export const GENERIC_ARCHIVES         = 14;

export const APP_ARCHIVE_URL = '/archives';
export const ARCHIVE_ROUTE_URL = 'archive';

export interface AppArchive {
    id: number;
    appId: number;
    documentId: number;
    objId: number;
    docDescription?: string;
    filename?: string;
    data?: any[];
}
export interface INFOArchive {
    id: number;
    appId: number;
    documentId: number;
    objId: number;
    docDescription?: string;
    filename?: string;
    data?: any[];
    info1?: string;
    info2?: string;
    info3?: string;
}

export interface AppArchiveObs {
    body: INFOArchive[];
    itemCount: number;
}

export const APPLICATIONS: Lookup[] = [
    { 'id': 1, 'description': 'COMMON_AGENT', descriptionAr: 'AAAgent' },
    { 'id': 2, 'description': 'ASSET_RECEPTIONS', descriptionAr: 'AAAssetReception' },
    { 'id': 3, 'description': 'COMMON_ASSETS', descriptionAr: 'AAAsset' },
    { 'id': 4, 'description': 'PAYROLL_EMPLOYEES', descriptionAr: 'AAEmployee' },
    { 'id': 5, 'description': 'LOGISTICS_PURCHASE_ORDER', descriptionAr: 'AAPOrder' },
    { 'id': 52, 'description': 'COMMON_RECEPTION', descriptionAr: '' },
    { 'id': 53, 'description': 'SALES_ORDER', descriptionAr: 'AASOrder' },
    { 'id': 54, 'description': 'COMMON_INVOICE', descriptionAr: 'AAInvoice' },
    // {'id': 6,  'description': 'COMMON_CONTRACT'},
    { 'id': 7, 'description': 'COMMON_ACCOUNTING', descriptionAr: 'AAAcounting' }
];

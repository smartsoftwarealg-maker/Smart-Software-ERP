export const AGENT_ARCHIVES            = 1;
export const ASSET_RECEPTIONS_ARCHIVES = 2;
export const ASSET_ARCHIVES            = 3;
export const EMPLOYEE_ARCHIVES         = 4;
export const DOCUMENT_ARCHIVES         = 5;
export const CONTRACT_ARCHIVES         = 6;
export const ACC_TRANSACTION_ARCHIVES  = 7;

export const APP_ARCHIVE_URL = '/archives';

export interface AppArchive {
    id: number;
    appId: number;
    documentId: number;
    objId: number;
    docDescription?: string;
    filename?: string;
    data?: any[];
}

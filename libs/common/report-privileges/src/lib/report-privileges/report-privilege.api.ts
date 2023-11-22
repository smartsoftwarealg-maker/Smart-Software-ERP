export const REPORT_PRIVILEGE_URL = '/reports/privileges';

export interface RPrivilege {
    folder: string;
    manager: boolean;
    hidden: boolean;
    id: number;
}

export const CRM_LEADS_URL = '/crm/leads/';
export const CRM_TRACKING_URL = '/tracking';


export interface CRMLeadsProgressLogger {
    id: number;
    parentId: number;
    status: string;
    stage: string;
    probability: number;
    priority: string;
    ownerId: number;
    teamId: number;
    amount: number;
    closedBy?: number;
    memo?: string;
    ownerDescription?: string;
    teamDescription?: string;
}




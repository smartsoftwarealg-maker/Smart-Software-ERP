export const CRM_OPPORTUNITY_URL = '/crm/opportunities/';
export const CRM_TRACKING_URL = '/tracking';


export interface CRMOpportunityProgressLogger {
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




export const CRM_OPPORTUNITY_URL = '/crm/opportunities/';
export const CRM_ACTIVITIES_URL = '/activities';


export interface CRMOpportunityActivity {
    id: number;
    parentId: number; //opportunityId
    activityType: string;
    subject: string;
    detail?: string;
    dueDate?: string;
    priority: string;
    duration: number;
    status: string;
    completionDate?: Date;
    feedback?: string;
    ownerId: number;
    teamId?: number;
    createdAt: Date;
    createdBy: number;
    updatedAt?: Date;
    updatedBy?: number;
    ownerDescription?: string;
    opportunityDescription?: string;
}

export interface EMessage {
    to: string;
    subject: string;
    body: string;
    isHTML: boolean;
}


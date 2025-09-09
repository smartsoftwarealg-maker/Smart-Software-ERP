import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CrmContactService } from '@ss/crm/crm-customer';
import { CRMContact } from '@ss/crm/crm-customer';

export const STAGE = [
    'PROPOSAL_SENT',
    'NEGOTIATION',
    'QUALIFIED',
    'CLOSED_WON',
    'CLOSED_LOST',
    'CANCELLED',
];

export const PRIORITY = ['LOW', 'MEDIUM', 'HIGH'];

export const STATUS = [
    'OPEN', // Initial contact and research phase
    'ON_HOLD',
    'IN_PROGRESS', // Understanding the customer's specific needs
    'CLOSED', // A formal CLOSED or quote has been sent
    'CLOSED_WON', // A formal CLOSED or quote has been sent
    'CANCELLED', // Actively negotiating terms
];

export interface CRMOpportunity {
    id: number;
    name: string;
    primaryContactId?: number;
    ownerId: number;
    companyId?: number; // new
    teamId?: number; // new
    partnerId?: number;
    amount: number;
    currency: number;
    expectedRevenue?: number;
    budgetAllocated?: number;
    discountAmount?: number;
    discountPercentage?: number;
    stage: string;
    status: string; // new
    priority: string;
    probability: number;
    closeDate: Date;
    actualCloseDate?: Date;
    lastStageChangeDate?: Date;
    createdDate: Date;
    lastModifiedDate: Date;
    campaignId?: number;
    leadSource?: string;
    competitors?: string; // new
    competitiveThreatLevel?: string;
    description?: string;
    tags?: string; // new
    memo?: string; // new
    createdBy: number;
    lastModifiedBy: number;
    closedBy?: number; // new
    // derived fields
    ownerDescription?: string;
    partnerDescription?: string;
    campaignDescription?: string;
    primaryContactDescription?: string;
    companyDescription?: string; // new
    contactPhone?: string;
    contactEmail?: string;
    contactFirstName?: string;
    contactLastName?: string;
}

export interface CRMOpportunityProgress {
    "id": number;
    "status": string;
    "stage": string;
    "probability": number;
    "priority": string;
    "ownerId": number;
    "teamId": number;
    "createdAt": Date;
    "amount": number;
    "closedBy": number;
    "createdBy": number;
    "memo": string;
}

export class CRMContactLookup extends DefaultAutoCompleteModel<CRMContact> {
    constructor(contactSrv: CrmContactService) {
        super(contactSrv, 'id', 'firstName');
    }

    override toString = (x: CRMContact) =>
        x ? x.firstName + ' ' + x.lastName : null;
}

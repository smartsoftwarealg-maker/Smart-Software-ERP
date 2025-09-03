export interface CRMOpportunity {
    id: number;
    name: string;
    primaryContactId?: number;
    ownerId: number;
    partnerId?: number;
    amount: number;
    currency: number;
    expectedRevenue: number;
    budgetAllocated: number;
    discountAmount: number;
    discountPercentage: number;
    stage: number;
    probability: number;
    closeDate: Date;
    actualCloseDate?: Date;
    lastStageChangeDate?: Date;
    createdDate: Date;
    lastModifiedDate: Date;
    campaignId?: number;
    leadSource?: string;
    competitiveThreatLevel?: string;
    description: string;
    tags?: string;
    createdBy: number;
    lastModifiedBy: number;
    // derived fields
    ownerDescription?: string;
    partnerDescription?: string;
    campaignDescription?: string;
    primaryContactDescription?: string;
}

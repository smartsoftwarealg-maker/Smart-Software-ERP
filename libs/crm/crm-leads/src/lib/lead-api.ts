export interface CRMLead {
    id: number;
    description: string;
    detail: string;
    email?: string;
    phone?: string;
    company?: string;
    companySite?: string;
    companyIndustry?: string;
    annualRevenue?: number;
    numberOfEmployees?: number;
    jobTitle?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: number;
    state?: string;
    postalCode?: string;
    country?: string;
    source: string;
    status: string;
    score: number;
    priority: string;
    estimatedValue?: number;
    probability: number;
    expectedCloseDate?: Date;
    campaignId?: number;
    ownerId?: number;
    teamId?: number;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy?: number;
    lastName?: string;
    firstName?: string;
    companyDescription?: string;
    ownerDescription?: string;
    campaignDescription?: string;
}

export interface LeadConverter {
    leadId: number;
    companyId: number;
    contactId: number;
}

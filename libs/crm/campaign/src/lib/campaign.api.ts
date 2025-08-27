export const CTYPES = [
    { value: 'EMAIL', description: 'ADMINISTRATION_EMAIL' },
    { value: 'WEBINAR', description: 'CRM_WEBINAR' },
    { value: 'SOCIAL_MEDIA', description: 'COMMON_SOCIAL_MEDIA' },
    { value: 'DIRECT_MAIL', description: 'CRM_DIRECT_MAIL' },
    { value: 'PHONE', description: 'ADMINISTRATION_PHONE' },
    { value: 'EVENT', description: 'COMMON_EVENT' },
    { value: 'PRODUCT_LAUNCH', description: 'CRM_PRODUCT_LAUNCH' },
    { value: 'REENGAGEMENT', description: 'CRM_REENGAGEMENT' },
];

export const STATUS = [
    { value: 'DRAFT', description: 'CRM_DRAFT' },
    { value: 'SCHEDULED', description: 'CRM_SCHEDULED' },
    { value: 'ACTIVE', description: 'COMMON_ACTIVE' },
    { value: 'PAUSED', description: 'COMMON_PAUSED' },
    { value: 'COMPLETED', description: 'COMMON_COMPLETED' },
    { value: 'CANCELED', description: 'COMMON_CANCELED' },
];

export const CHANNELS = [
    { value: 'EMAIL', description: 'ADMINISTRATION_EMAIL' },
    { value: 'SMS', description: 'COMMON_SMS' },
    { value: 'SOCIAL_MEDIA', description: 'COMMON_SOCIAL_MEDIA' },
    { value: 'PHONE', description: 'ADMINISTRATION_PHONE' },
    { value: 'DIRECT_MAIL', description: 'CRM_DIRECT_MAIL' },
];

export interface Campaign {
    // === Identity ===
    id: number;
    // === Core Attributes ===
    name: string;
    cType: string; //| 'EMAIL' | 'WEBINAR' | 'SOCIAL_MEDIA' | 'DIRECT_MAIL' | 'PHONE' | 'EVENT' | 'PRODUCT_LAUNCH' | 'REENGAGEMENT';
    status: string; //| 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELED';
    description?: string;
    // === Targeting & Audience ===
    audienceQuery?: string; // e.g.| "industry = 'Tech' AND leadScore > 50"
    audienceSize: number; // Computed count
    tag: string; // e.g.| "Q3_Product_Launch"
    // === Scheduling ===
    startDate: Date;
    endDate?: Date;
    // === Budget & ROI ===
    budget?: number;
    actualCost: number;
    expectedRevenue?: number;
    // === Channel Configuration ===
    channels: string; //'EMAIL' | 'SMS' | 'SOCIAL_MEDIA' | 'PHONE' | 'DIRECT_MAIL'; // Possible values: EMAIL| SMS| SOCIAL_MEDIA| PHONE| DIRECT_MAIL
    emailTemplateId?: number;
    smsTemplateId?: number;
    landingPageUrl?: string;
    callScript?: string;
    // === Hierarchy & Relationships ===
    ownerId: number; // CRM user responsible
    ownerDescription?: string;
    // === Audit Fields ===
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;
}

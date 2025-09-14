export const STATUS = ['ACTIVE', 'INACTIVE', 'DRAFT', 'DEPRECATED'];
export const CATEGORY = [
    'ONBOARDING',
    'SALES FOLLOW-UP',
    'NURTURE',
    'WIN-BACK',
    'CUSTOMER SUCCESS',
    'SUPPORT',
    'TRANSACTIONAL',
    'MARKETING',
    'FEEDBACK_SURVEYS',
    'RENEWAL_UPSELL',
    'EVENT PROMOTION',
    'REFERRAL PROGRAM',
    'COMPLIANCE',
    'INTERNAL',
    'TRIAL',
    'ABANDONED CART',
];

export interface EmailTemplate {
    id: number;
    name: string;
    subject: string;
    thumbnail?: string;
    htmlContent: string;
    textContent?: string;
    category?: string;
    tags?: string;
    mergeFields?: string;
    status: string;
    ownerId: number;
    teamId?: number;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;
    ownerDescription?: string;
}

export const SOCIAL_WORKS_TYPE = 1;
export const MEDICAL_AIDS_TYPE = 2;

//URLs
export const TYPES_URL = '/social/types';
export const AIDS_URL = '/aids';
export const SOCIAL_AIDS_URL = '/social/aids';
export const SOCIAL_ACTIVITIES_URL = '/social/social_activities';
export const MEDICAL_AIDS_URL = '/social/medical_aids';

// Classes
export interface SocialAid {
        id: number;
        centerId: number;
        aidType: number;
        date: Date;
        number: number;
        personId: number;
        amount: number;
        referenceAmount?: number;
        medicalAidType?: number;
        installmentCount: number;
        parentId: number;
        firstName?: string;
        lastName?: string;
        description?: string;
        typeDescription?: string;
        medicalTypeDescription?: string;
        rate?: number;
}

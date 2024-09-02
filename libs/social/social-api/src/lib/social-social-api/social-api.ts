export const SOCIAL_WORKS_TYPE = 1;
export const MEDICAL_AIDS_TYPE = 2;
export const REIMBURSEMENT = 'Reimbursement';

//URLs
export const TYPES_URL = '/social/types';
export const AIDS_URL = '/aids';
export const EMPLOYEE_URL = '/social/employees';
export const SOCIAL_AIDS_URL = '/social/aids';
export const SOCIAL_ACTIVITIES_URL = '/social/social_activities';
export const ACTIVITIES_URL = '/social/activities';
export const MEDICAL_AIDS_URL = '/social/medical_aids';
export const REIMBURSEMENTS_URL = '/reimbursements';

// Classes
export interface SocialAid {
    id: number;
    centerId: number;
    aidType?: number;
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

export interface SActivity {
    value: number;
    description: string;
}

export interface SBalance {
    bank: string;
    balance: number;
}

export interface TreasuryBalance {
    journal: string;
    year: number,
    balance: number;
}

export interface Dashboard {
    id: number;
    employeeCount: number;
    femaleCount: number;
    counts: SActivity[];
    amounts: SActivity[];
    paymentCounts: SActivity[];
    payments: SActivity[];
    balance: SBalance[];
    annualCounts: SActivity[];
    annualAmounts: SActivity[];
    treasury: TreasuryBalance[];
}

export interface Reimbursement {
    id: number;
    amount?: number;
    parentId: number;
    reference?: string;
    date?: Date;
}

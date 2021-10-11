export const PATIENT_URL = '/patients';

export class Patient {
    id: number;
    firstName: string;
    lastName: string;
    address?: string;
    city?: number;
    country?: number;
    phone?: string;
    mobile?: string;
    fax?: string;
    firstNameAr?: string;
    lastNameAr?: string;
    addressAr?: string;
    agentType: number;
    email?: string;
    recordBlocked?: boolean;
    blockingReason?: string;
    creationTime: Date;
    birthDate?: Date;
    birthPlace?: string;
    bloodGroup?: number;
    currency?: number;
}

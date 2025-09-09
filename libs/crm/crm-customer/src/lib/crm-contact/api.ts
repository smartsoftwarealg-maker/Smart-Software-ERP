export const CRM_CONTACT_URL = '/contacts';
export const CRM_ACCOUNT_URL = '/crm/accounts';

export interface CRMContact {
    id: number;

    // Name Components
    salutation?: string; // "Mr", "Dr", etc.
    firstName: string;
    middleName?: string;
    lastName: string;

    // Primary Contact Info
    primaryEmail: string;
    primaryEmailVerified: boolean;
    secondaryEmail?: string;
    primaryPhone: string;
    primaryPhoneType: string; // MOBILE|WORK|HOME|FAX
    secondaryPhone?: string;
    secondaryPhoneType?: string;

    // Address
    addressLine1?: string;
    addressLine2?: string;
    city?: number;
    stateProvince?: number;
    postalCode?: string;
    country?: string; // ISO 3166-1 alpha-2
    addressType?: string; // WORK|HOME|BILLING

    // Company Details
    parentId: number;
    companyName?: string;
    department?: string;
    jobTitle?: string;
    isDecisionMaker: boolean;
    startDate?: Date;

    // Digital Profiles
    linkedInUrl?: string;
    twitterHandle?: string;
    facebookUrl?: string;

    // Preferences
    preferredContactMethod?: string; // EMAIL|PHONE|SMS
    preferredLanguage?: string; // ISO 639-1
    timezone?: string; // IANA timezone
    doNotContact: boolean;
    marketingOptIn: boolean;
    optInDate?: Date;

    // Demographic Data (GDPR-sensitive)
    birthDate?: Date;
    gender?: string; // MALE|FEMALE

    // System Metadata
    createdAt: Date;
    createdBy: number;
    updatedAt?: Date;
    updatedBy: number;
    sourceSystem?: string; // "SALESFORCE", "MANUAL", etc.
    isDeleted: boolean;
}



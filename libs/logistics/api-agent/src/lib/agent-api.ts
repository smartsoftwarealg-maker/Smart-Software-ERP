export const AGENT_URL = '/agents';
export const CUSTOMER_URL = '/customers';
export const CONSUMER_URL = '/consumers';
export const SUPPLIER_URL = '/suppliers';

export interface Agent {
    id: number;
    customerCode: string;
    isInternal?: boolean;
    denomination: string;
    address?: string;
    address2?: string;
    city?: number;
    country?: number;
    phone?: string;
    mobile?: string;
    fax?: string;
    contact?: string;
    info?: string;
    currency?: number;
    taxPayable?: boolean;
    commRegister?: string;
    fiscalID?: string;
    articleNo?: string;
    stampPayable?: boolean;
    price: number;
    denominationAr?: string;
    addressAr?: string;
    address2Ar?: string;
    capital?: string;
    bank?: number;
    bankAccount?: string;
    swift?: string;
    agentType?: number;
    companyType?: number;
    email?: string;
    website?: string;
    nis?: string;
    nif?: string;
    debtLimit?: number;
    debtTerm?: number;
    payMode?: number;
    checkDueDays?: number;
    activity?: number;
    recordBlocked?: boolean;
    blockingReason?: string;
    subcontractor?: boolean;
    creationTime?: string;
    tin?: string;
    password?: string;
    /**
     * @deprecated This field doesn't exist in the backend; it will be removed
     */
    license?: string // FIXME:: remove this field
}


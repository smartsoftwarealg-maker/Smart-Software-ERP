export const CENTER_URL = '/centers';

export interface Center {
    id: number;
    description: string;
    descriptionAr: string;
    company: number;
    address: string;
    ssNumber: string;
    activity: string;
    activityCode: number
    monthValidated: boolean;
    payMonth: number;
    bank: number;
    bankRib: string;
    abbreviation: string;
    bankAccount: string;
    logo: string;
    articleNo: string;
    fiscalId: string;
    commReg: string;
    fax: string;
    nif: string;
    nis: string;
    phone: string;
    email: string;
    addressAr: string;
    fundId: number;
    severe: boolean;
    isPublic: boolean;
    city?: number;
    emailPassword?: string;
    headCenter:string
}



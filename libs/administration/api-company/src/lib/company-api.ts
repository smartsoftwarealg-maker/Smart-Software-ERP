export const COMPANY_URL = '/companies';

export interface Company {
    id: number;
    description: string;
    parentId: number;
    company2: string;
    address1: string;
    address2: string;
    ssNumber: string;
    email: string;
    phone: string;
    fax: string;
    fiscalID: string;
    articleNo: string;
    bank: string;
    address1Ar: string;
    website: string;
    headquarters: boolean;
    license: string;
    isGroup: boolean;
    commRegister: string;
    capital: string;
    descriptionAr: string;
    company2Ar: string;
    address2Ar: string; //20
    nis: string;
    nif: string;
    bankAccount: string;
    logo: string;
    consolidationCompany: boolean;
}



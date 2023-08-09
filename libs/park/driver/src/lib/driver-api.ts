import { ImageModel } from '@ss/common/ui-image-input';

export const DRIVERS = '/drivers';
export const LICENSES = '/licenses';

export interface Driver {
    id: number;
    firstName: string,
    lastName: string,
    birthDate?: string;
    birthPlace?: string;
    bp_postal_code?: string;
    father?: string;
    mother?: string;
    sex: number;
    ss_Number?: string;
    maritalStatus?: number;
    address1?: string;
    daira?: number;
    phone?: string;
    mobile?: string;
    email?: string;
    educationLevel?: number;
    firstNameAr?: string;
    lastNameAr?: string; //20
    birthPlaceAr?: string;
    address1Ar?: string;
    fatherAr?: string;
    motherAr?: string;
    nationality?: number; //30
    postal_code?: string;
    diploma?: number;
    blood_group?: number;
    driving_license?: string;
    dl_issuer?: string;
    dl_date?: string;
    is_driver: boolean,
    post?: string;
    birthCity?: number;
    imageModel?: ImageModel;
}

export interface DriverLicense {
    id: number;
    parentId: number;
    licenseType: string;
    from: Date;
    to: Date;
}

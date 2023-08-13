import { ImageModel } from '@ss/common/ui-image-input';

export const DRIVERS = '/drivers';
export const LICENSES = '/licenses';
export const VEHICLES = '/vehicles';

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

export interface VehicleAssignment {
    id: number;
    parentId: number;
    personId: number;
    date?: Date;
    workPlace?: string;
    description: string;
    plateNo?: string;
}

export interface DriverVehicle {
    id: number;
    parentId: number;
    vehicleId: number;
    date?: Date;
    workPlace?: string;
    description: string;
    plateNo?: string;
}

export interface Vehicle {
    id: number;
    centerId: number;
    description?: string;
    acquisitionDate?: Date;
    plateNumber?: string;
    odoMeter?: number;
    vType?: number;
    typeDescription?: string;
}

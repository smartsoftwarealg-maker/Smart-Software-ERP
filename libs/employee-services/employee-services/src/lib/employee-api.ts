import { ImageModel } from '@ss/common/ui-image-input';
export const EMPLOYEES_URL = '/persons';
export const SUBORDINATE_URL = '/subordinates';
export const CMMS_EMPLOYEES_URL = '/cmms-persons';
export const INACTIVE_EMPLOYEES_URL = '/inactive-persons';
export const EMPLOYEE_PHOTO_URL = '/photo';

export interface PersonSummary {
    id: number;
    lastName:  string;
    firstName: string;
    birthDate: string;
    birthPlace: string;
    sex: string;
    post: string;
    department: string;
    service: string;
    maritalStatus: string;
    employmentType: string;
    hireDate: string;
    profCategory: string;
    contractType: string;
    categSection: string;
    rank: string;
    userId?: number;
}
export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  post?: string;
}

export interface Employee extends IEmployee {
    id: number;

    firstName: string;
    lastName: string;

    firstNameAr: string;
    lastNameAr: string;

    birthDate: string;
    birthPlace: string;
    birthPlaceAr: string;

    father: string;
    mother: string;

    fatherAr: string;
    motherAr: string;

    nationality: number;

    email: string;
    phone: string;
    mobile: string;

    address1: string;
    address1Ar: string;

    sex: 1 | 2;

    confidential: boolean;
    ss_Number: string;
    by_rule: boolean;
    customCode: string;
    maritalStatus: number;

    mservice: number;
    educationalLevel: number;
    diploma: number;
    mutualno: string;
    post?: string;
    fullName?: string;
    imageModel?: ImageModel;
    birthCity?: number;
    password?: string;
    is_driver: boolean;
    msDescription?: string;
    blood_group?: number;
    cmmsPerson: boolean;
    hourlyRate?: number;
    userId?: number;
    nin?: string;
    accountLockDate?: Date;
}

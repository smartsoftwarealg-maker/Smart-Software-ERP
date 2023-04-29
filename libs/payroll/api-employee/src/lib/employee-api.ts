import {ImageModel} from '@ss/common/ui-image-input';

export const EMPLOYEES_URL = '/persons';
export const INACTIVE_EMPLOYEES_URL = '/inactive-persons';
export const EMPLOYEE_PHOTO_URL = '/photo';

export const ACTIVATION_PARENT_URL = '/persons';
export const ACTIVATION_CHILD_URL = '/activations';

export const CAREER_PARENT_URL = '/persons';
export const CAREER_CHILD_URL = '/careers';

export const CONTRACT_PARENT_URL = '/persons';
export const CONTRACT_CHILD_URL = '/contracts';

export const WIVES_PARENT_URL = '/persons';
export const WIVES_CHILD_URL = '/wives';

export const CHILDREN_PARENT_URL = '/persons';
export const CHILDREN_CHILD_URL = '/children';

export const LANGUAGES_PARENT_URL = '/persons';
export const LANGUAGES_CHILD_URL = '/languages';

export const OLD_CAREER_PARENT_URL = '/persons';
export const OLD_CAREER_CHILD_URL = '/oldcareers';

export const DECISION_PARENT_URL = '/persons';
export const DECISION_CHILD_URL = '/decisions';

export interface Employee {
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



    // things that may have changed
    //    wilaya: number; // was removed??
    mservice: number;
    educationalLevel: number;
    diploma: number;
    mutualNumber: string;
    post?: string;
    fullName?: string;
    imageModel?: ImageModel;
    birthCity?: number;
    password?: string;
}

export interface EmployeeActivation {
    id: number;
    centerId: number;
    empId: number;
    activityStatus: number;
    hireDate: string;
    suspended: boolean;
    suspensionDate: string;
    suspensionReason: number;
    employmentType: number;
    inConflict: boolean;
    centerName?: string;
}

export interface Career {
    id: number;
    employee: number;
    paymonth: number;
    post: number;
    division: number;
    department: number;
    service: number;
    salary_grid: number;
    prof_category: number;
    salary_rank: number;
    from_date: string;
    to_date: string;
    trial_period: number;
    decision: string;
    decision_date: string;
    gridCategory?: string;
    gridSection?: string;
    profCategory?: string;
    workshop?: number;
    cost_center?: number;
    // todo: add these fields
    // motive               ?: number;
    // qualification        ?: number;
    // responsible          : Option[Long] = None,
}

export interface Contract {
    id: number;
    centerId: number;
    employee: number;
    number: string;
    info?: number;
    recordNumber: string;
    date: string;
    related_contract: number;
    fromdate: string;
    todate: string;
    post: number;
    salarygrid: number;
    salary_rank: number;
    basesalary: number;
    notes: string;
    motive: number;
    department: number;
    service: number;
    division: number;
    cost_center: number;
    ctype: number;
    valid_date: string;
    project: number;
    trial_period: number;
    confirmed: boolean;
}

export interface Wife {
    id: number;
    employee: number;
    name: string;
    name_ar?: string;
    birthdate?: string;
    birthPlace?: string;
    notDivorced: boolean;
    father?: string;
    father_ar?: string;
    mother?: string;
    mother_ar?: string;
}

export interface Child {
    id: number;
    employee: number;
    name: string;
    sex: 1 | 2;
    birthDate?: string;
    birthPlace?: string;
}

export interface EmployeeLanguage {
    id: number;
    person_id: number;
    language_id: number;
    read_level: number;
    write_level: number;
}

export interface OldCareer {
    id: number;
    employee: number;
    ctype: 1 | 2; // '1 = In sector, 2 = beyond sector'
    post: string;
    from_date: string;
    to_date: string;
    rate: number;
}

export interface Decision {
    id: number;
    centerId: number;
    employee: number;
    dec_reference: string;
    dec_date: string;
    application_date: string;
    dec_motive: number;
    application_period: number;
    dec_header: string;
    motiveName?: string;
}

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
}

export interface PaymentInfo {
    id: number;
    employee: number;
    maritalStatus?: number;
    fund1?: number;
    fund2?: number;
    bank?: number;
    accountno?: string;
    paymode?: number;
}

export interface HolidayRequest{id: number;
    centerId: number;
    personId: number;
    hType: number;
    from?: Date;
    to?: Date;
    firstName?: string;
    lastName?: string;
    typeDescription?: string;
}

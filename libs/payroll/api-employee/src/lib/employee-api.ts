
export const EMPLOYEES_URL = '/persons';
export const EMPLOYEE_PHOTO_URL = '/photo';

export const ACTIVATION_PARENT_URL = '/persons';
export const ACTIVATION_CHILD_URL = '/activations';

export const CAREER_PARENT_URL = '/persons';
export const CAREER_CHILD_URL = '/career';

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
    ​
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
}

export class EmployeeActivation {
    id: number;
    center: number;
    empId: number;
    activityStatus: number;
    hireDate: string;
    suspended: boolean;
    suspensionDate: string;
    suspensionReason: number;
    employmentType: number;
    inConflict: boolean;
}

export class Career {
    id: number;
    employee: number;
    post: number;
}


export const EMPLOYEES_URL = '/persons';
export const EMPLOYEE_PHOTO_URL = '/photo';

export const ACTIVATION_PARENT_URL = '/persons';
export const ACTIVATION_CHILD_URL = '/activations';

export const CAREER_PARENT_URL = '/persons';
export const CAREER_CHILD_URL = '/careers';

export const CONTRACT_PARENT_URL = '/persons';
export const CONTRACT_CHILD_URL = '/contracts';

export const WIVES_PARENT_URL = '/persons';
export const WIVES_CHILD_URL = '/wives';

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
}

export class EmployeeActivation {
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
}

// [{"id":2432,"employee":1,"paymonth":202101,"post":325,"division":3,"department":4,"service":23,"salary_grid":45,"prof_category":20,"salary_rank":101,"from_date":"2014-01-01 00:00:00","to_date":"2021-02-01 00:00:00","trial_period":0}]
export class Career {
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

    // todo: add these fields
    // motive               : Option[Int] = None,
    // workshop             : Option[Int] = None,
    // cost_center          : Option[Int] = None,
    // qualification        : Option[Int] = None,
    // responsible          : Option[Long] = None,
}

export class Contract {
    id: number;
    centerId: number;
    employee: number;
    number: string;
    info: string;
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

export class Wife {
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

import {Center} from "@ss/common/api-center";


export interface AccessRight {
    id: number;
    center: number;
    roleId: number;
    document: number;
    rights: Right;
}

export interface User {
    id: number;
    description: string;
    fullName: string;
    manager: boolean;
    blocked: boolean;
    androidLicense?: string;
}

export interface UserContext {
    userId: number;
    userName: string;
    manager: boolean;
    company: number;
    center: number;
    severe: boolean;
    payMonth: number;
    personId: number;
    agentId: number;
    fullName?: string;
    blocked: boolean;
    pwdExpired: boolean;
}

export interface UserInfo {
    user: User;
    roles?: Role[];
    centers?: Center[];
}

export interface Right {
    read: boolean;
    create: boolean;
    edit: boolean;
    del: boolean;
}

export interface Role {
    id: number;
    description: string;
}

export interface DocRight {
    document: string;
    right: Right;
}




export interface Person {
    id: number;
    customCode: string;
    birthInfo: {
        firstName: string;
        lastName: string;
        birthDate: string;
        birthPlace: string;
        father: string;
        mother: string;
        sex: 1 | 2;
    };
    address: { address: string; wilaya: number };
    maritalStatus: number;
    mservice: number;
    nationality: number;
    educationalLevel: number;
    retirementDate: string;
    diploma: number;
    ssNumber: string;
    mutualNumber: string;
    license?: string;
}



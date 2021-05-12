export interface Company {
    id: number;
    description: string;
    address: string;
    descriptionAr: string;
}

export interface Center {
    id: number;
    description: string;
}

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

export interface UserRole {
    id: number;
    userId: number;
    roleId: number;
    description?: string;
}

export interface UserCenter {
    id: number;
    userId: number;
    centerId: number;
    description?: string;
}

export interface DocRight {
    document: string;
    right: Right;
}

export interface Agent {
    id: number;
    customerCode: string;
    denomination: string;
    code: string;
    address?: string;
    denominationAr?: string;
    addressAr?: string;

   /**
     * @deprecated This field doesn't exist in the backend; it will be removed
     */
    license: string // FIXME:: remove this field

}



export interface Person {
    id: number;
    customCode: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthPlace: string;
    father: string;
    mother: string;
    sex: 1 | 2;
    address: { address: string; wilaya: number };
    maritalStatus: number;
    mservice: number;
    nationality: number;
    educationalLevel: number;
    diploma: number;
    ssNumber: string;
    mutualNumber: string;
    license?: string;
}



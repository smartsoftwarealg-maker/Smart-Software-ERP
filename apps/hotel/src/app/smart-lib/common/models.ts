
// export interface AccessRight {
//     id: number;
//     center: number;
//     roleId: number;
//     document: number;
//     rights: Right;
// }

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

export interface PaymentInfo {
    center: number;
    document: number;
    number: number;
    checkInfo: number;
    agentId: number;
}

export interface Lookup {
    id: number;
    description?: string;
}

export interface Ledger {
    id: number;
    center: number;
    document: number;
    number: number;
    date: string;
    accountno: string;
    customerCode: string;
    balance: number;
    reference: string;
    fileId: number;
    valueId: number;
    balanceSign: number;
    purchasePrice: number;
    checkInfo: number;
    ledgerType: number;
    description: string;
    departmentName?: string;
    typeDescription?: string;
}

export interface Agent {
    id: number;
    code: string;
    agentType: number;
    denomination: string;
    address: { address: string, mobile?: string, phone?: string, fax?: string, city?: number };
    blocked: boolean;
    license?: string;
}

export interface Center {
    id: number;
    description: string;
}

export interface Company {
    id: number;
    description: string;
    address: string;
    descriptionAr: string;
}

export interface CostCenter {
    id: number;
    code: string;
    description: string;
    groupId: number;
}

export interface CostCenterGroup {
    id: number;
    description: string;
}

export interface Debt {
    description?: string;
    document: number;
    number: number;
    date?: string;
    balance?: number;
    balanceSign: number;
}


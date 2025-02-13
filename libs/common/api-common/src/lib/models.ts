import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

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
    centerId: number;
    roleId: number;
    document: number;
    rights: number;
    roleName?: string;
    read?: boolean;
    write?: boolean;
    edit?: boolean;
    delete?: boolean;
    roleDescription?: string;
}

export interface Password {
    id: number;
    agentId?: number;
    personId?: number;
    password: string;
}

export interface User {
    id: number;
    description: string;
    fullName: string;
    fullNameAr?: string;
    manager: boolean;
    blocked: boolean;
    responsible?: boolean;
    password?: string;
    androidLicense?: string;
    email?: string;
}

export interface AppContext {
    id: number;
    userName: string;
    manager: boolean;
    responsible: boolean;
    company: number;
    center: number;
    severe: boolean;
    payMonth?: number;
    personId?: number;
    agentId?: number;
    fullName?: string;
    blocked?: boolean;
    pwdExpired?: boolean;
    hasPassword?: boolean;
    accYear?: number;
    accFile?: number;
    accPeriod?: number;
    params: Map<string, string>;
    description?: string;
    verified: boolean;
    email?: string;
}

export interface ESender {
    email: string;
    pwd: string;
    to: string;
    subject: string;
    body: string;
}

export interface Credentials {
    username: string;
    password: string;
}

export interface LoginInfo {
    jwt: string;
    ctx: AppContext;
}

export interface UserInfo {
    user: User;
}

export interface SideNavNode {
    icon: string;
    name: string;
    route?: string;
    visible?: boolean;
    accessRights?: string;
    children?: SideNavNode[];
    backgroundColor?: string;
    customerRights?: Right;
}

export interface Right {
    read: boolean;
    write: boolean;
    edit: boolean;
    delete: boolean;
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
    rights: number;
    read: boolean;
    write: boolean;
    edit: boolean;
    delete: boolean;
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


export abstract class PaginationModel {

    public abstract get page(): number;
    public abstract set page(p: number);

    public abstract get pageSize(): number;
    public abstract set pageSize(s: number);

    public abstract get elementCount(): number;
    public abstract set elementCount(c: number);

    public onChange: () => void = null;

    public static newInstance(conf?: { page: number, pageSize: number, elementCount: number }): PaginationModel {
        const c = conf == null
            ? { page: 1, pageSize: 5, elementCount: 0 }
            : conf;
        return new ExtendedPaginationModel(c.page, c.pageSize, c.elementCount);
    }

    public abstract copyModel(that: PaginationModel): void;
}

export class ExtendedPaginationModel extends PaginationModel {

    public propagatedPage;
    public propagatedPageSize;
    public propagatedElementCount;

    constructor(public mPage: number, public mPageSize: number, public mElementCount: number) {
        super();
        this.propagatedPage = mPage;
        this.propagatedPageSize = this.mPageSize;
        this.propagatedElementCount = mElementCount;
    }

    public onPageChange: () => void;
    public onPageSizeChange: () => void;
    public onElementCountChange: () => void;

    public get page(): number {
        return this.mPage;
    }

    public set page(p: number) {
        if (this.mPage === p) {
            return;
        }
        this.mPage = p;
        if (this.onPageChange != null) {
            this.onPageChange();
        }
    }

    public get pageSize(): number {
        return this.mPageSize;
    }

    public set pageSize(s: number) {
        if (this.mPageSize === s) {
            return;
        }
        this.mPageSize = s;
        if (this.onPageSizeChange != null) {
            this.onPageSizeChange();
        }
    }

    public get elementCount(): number {
        return this.mElementCount;
    }

    public set elementCount(c: number) {
        if (this.mElementCount === c) {
            return;
        }
        this.mElementCount = c;
        this.propagatedElementCount = c;
        if (this.onElementCountChange != null) {
            this.onElementCountChange();
        }
    }

    public fireChangeEvent(): void {
        if (this.propagatedPage === this.mPage
            && this.propagatedPageSize === this.mPageSize
            && this.propagatedElementCount === this.mElementCount) {
            return;
        }
        this.propagatedElementCount = this.mElementCount;
        this.propagatedPageSize = this.mPageSize;
        this.propagatedPage = this.mPage;
        if (this.onChange != null) {
            this.onChange();
        }
    }

    public copyModel(thatModel: PaginationModel): void {
        if (thatModel == null) {
            return;
        }
        const that: ExtendedPaginationModel = (thatModel as ExtendedPaginationModel);
        this.mPage = that.mPage;
        this.mPageSize = that.mPageSize;
        this.mElementCount = that.mElementCount;
        this.propagatedPage = that.propagatedPage;
        this.propagatedPageSize = that.propagatedPageSize;
        this.propagatedElementCount = that.propagatedElementCount;
    }
}



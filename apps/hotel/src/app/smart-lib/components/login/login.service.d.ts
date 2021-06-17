import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpService } from '../../common/http.service';
import { Agent } from '../../common/models';
import { DecService } from './dec.service';
export declare enum LicenseErrorType {
    UserLicense = 1000,
    AgentLicense = 2000,
    PersonLicense = 3000
}
export interface Person {
    id: number;
    customCode?: string;
    address?: {
        address?: string;
        mobile?: string;
    };
    birthInfo: {
        firstName: string;
        lastName: string;
        birthDate: string;
        birthPlace?: string;
    };
    maritalStatus: number;
    mservice: number;
    nationality: string;
    ssNumber: string;
    license?: string;
}
export interface PersonResponse {
    person: Person;
}
export declare class LoginService {
    private httpSrv;
    userSrv: UserService;
    private decSrv;
    router: Router;
    agent: Agent;
    person: Person;
    hasPassword: boolean;
    wrongData: boolean;
    licenseErrorType: LicenseErrorType;
    private bUserLogin;
    private loggedIn;
    private tryAgent;
    private tryPerson;
    constructor(httpSrv: HttpService, userSrv: UserService, decSrv: DecService, router: Router);
    readonly isLoggedIn: boolean;
    tryAgentLogin: boolean;
    tryPersonLogin: boolean;
    reLogin(): Observable<boolean>;
    isUserLogin(): boolean;
    isAgentLogin(): boolean;
    isPersonLogin(): boolean;
    select(agent: Agent): void;
    centerLogin(center: number): Observable<string>;
    logout(): void;
    loginFromStorage(): void;
    userLogin(user: {
        username: string;
        password: string;
    }, isAndroid: boolean, onFinish?: () => void): void;
    private loadAgentFromStorage;
    private loadPersonFromStorage;
    agentLogin(user: {
        username: string;
        password: string;
    }, isAndroid: boolean, onFinish?: () => void): void;
    personLogin(user: {
        username: string;
        password: string;
    }, isAndroid: boolean, onFinish?: () => void): void;
    updateUserLicense(license: string): Observable<number>;
    updatePersonLicense(license: string): Observable<number>;
    updateAgentLicense(license: string): Observable<number>;
    updatePersonMobile(license: string): Observable<number>;
    updateAgentMobile(license: string): Observable<number>;
}

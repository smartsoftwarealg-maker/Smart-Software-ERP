import { Injectable } from '@angular/core';
import {mergeMap, Observable, of} from 'rxjs';
import { Router } from '@angular/router';
import { catchError, flatMap, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Agent, User } from '../../common/models';
import { DecService } from './dec.service';
import { CENTER_SELECT_URL } from '../center-select/center-select-constants';
import { LOGIN_URL } from './login-constants';
import { LoginInfo } from '@ss/common/api-common';
import { HttpService } from '../../../smart-lib/common/http.service';

export enum LicenseErrorType {
    UserLicense = 1000,
    AgentLicense = 2000,
    PersonLicense = 3000
}

// TODO: move the interface person from here
// TODO: rewrite LoginService

export interface Person {
    id: number;
    customCode?: string;
    address?: { address?: string; mobile?: string; };
    birthInfo: { firstName: string; lastName: string; birthDate: string; birthPlace?: string; };
    maritalStatus: number;
    mservice: number;
    nationality: string;
    ssNumber: string;
    license?: string;
}

export interface PersonResponse {
    person: Person;
}

@Injectable()
export class LoginService {
    public agent: Agent = null;
    public person: Person = null;
    public hasPassword = false;
    public wrongData = false;
    public licenseErrorType: LicenseErrorType = null;
    private bUserLogin = false;
    private loggedIn = false;

    constructor(private httpSrv: HttpService,
        public userSrv: UserService,
        private decSrv: DecService,
        public router: Router) {
    }

    get isLoggedIn(): boolean {
        return this.loggedIn;
    }

    public reLogin(): Observable<boolean> {
        return this.httpSrv
            .init()
            .pipe(mergeMap(_ =>
                this.httpSrv.get<any>('/relogin')
                    .pipe(
                        tap(res2 => this.loginFromStorage()),
                        catchError(err => {
                            return of(false);
                        }),
                        switchMap(res => this.userSrv.load()),
                        map(res => {
                            const failure: boolean = !this.agent && !this.person && !this.loggedIn;
                            if (failure) {
                                this.router.navigate(['/login']);
                            }
                            return !failure;
                        })
                    )));
    }

    public isUserLogin(): boolean {
        return this.bUserLogin;
    }

    public isAgentLogin(): boolean {
        return this.agent != null;
    }

    public isPersonLogin(): boolean {
        return this.person != null;
    }

    public select(agent: Agent): void {
        this.agent = null;
        this
            .httpSrv
            .put(`/agents/${agent.id}/select`)
            .subscribe(res => {
                // localStorage.setItem('auth_token', res['payload']);
                this.httpSrv.updateAuthToken(res.payload);
                this.agent = agent;
                localStorage.setItem('agent', JSON.stringify(this.agent));
                this.userSrv.context.agentId = agent.id;
            });
    }

    public centerLogin(center: number): Observable<string> {
        return this
            .httpSrv
            .get<string>('/clogin/' + center)
            .pipe(tap<string>(res => {
                this.httpSrv.updateAuthToken(res);
                // localStorage.setItem('auth_token', res);
            }));
    }

    public setPayrollMonth(month: number): Observable<any> {
        return this.httpSrv
            .put('/payroll/month', { 'payMonth': month })
            .pipe(tap(res => this.httpSrv.updateAuthToken(res)));
    }

    public logout() {
        //     localStorage.removeItem('auth_token');
        //     localStorage.removeItem('has-pwd');
        //     localStorage.removeItem('userInfo-login');
        //     localStorage.removeItem('agent');
        // localStorage.clear();
        this.router.navigate(['/' + LOGIN_URL])
            .then(fulfilled => {
                if (fulfilled) {
                    this.loggedIn = false;
                    this.hasPassword = false;
                    this.bUserLogin = false;
                    this.agent = null;
                    this.userSrv.clear();
                    localStorage.removeItem('auth_token');
                }
            });
    }

    public loginFromStorage() {
        this.loggedIn = true;
        this.hasPassword = 'true' === localStorage.getItem('has-pwd');
        this.bUserLogin = 'true' === localStorage.getItem('userInfo-login');
    }

    public userLogin(user: { username: string, password: string }, isAndroid: boolean, onFinish?: () => void) {
        this.bUserLogin = false;
        this.loggedIn = false;
        this.wrongData = false;
        this.licenseErrorType = null;
        this
            .httpSrv
            .doLogin('/login', user)
            .pipe(switchMap((jwt: string) => {
                this.httpSrv.updateAuthToken(jwt);
                return this.httpSrv
                    .get<any>('/cuser')
                    .pipe(
                        tap((usr: User) => {
                            const valid = !isAndroid || this.decSrv.isValidLicense(usr.androidLicense, usr.description);
                            if (!valid) {
                                this.licenseErrorType = LicenseErrorType.UserLicense;
                                this.wrongData = false;
                            }
                            return usr;
                        })
                    );
            }))
            .subscribe(res => {
                if (!this.licenseErrorType) {
                    this.bUserLogin = true;
                    this.loggedIn = true;
                    localStorage.setItem('userInfo-login', 'true');
                    this.hasPassword = user.password !== '';
                    localStorage.setItem('has-pwd', this.hasPassword + '');
                    this.router.navigate(['/' + CENTER_SELECT_URL]);
                }
                if (onFinish != null) {
                    onFinish();
                }
            }, err => {
                if (err.status === 401) {
                    localStorage.setItem('userInfo-login', 'false');
                    this.wrongData = !this.licenseErrorType;
                    if (this.licenseErrorType) {
                        if (onFinish != null) {
                            onFinish();
                        }
                    } else if (onFinish != null) {
                        onFinish();
                    }
                } else {
                    if (onFinish != null) {
                        onFinish();
                    }
                    throw err;
                }
            });
    }

    public updateUserLicense(license: string): Observable<number> {
        return this.httpSrv.put('/users/license', { license });
    }

}

import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AppContext, Credentials, ESender, LoginInfo, UserInfo } from './models';
import { CENTER_SELECT_URL, INDEX_PAGE_URL, LOGIN_URL, UPDATE_PASSWORD_URL } from './constants';
import { HttpService } from './http.service';
import { MainPageService } from './main-page.service';
import { CompanySelectorService } from './company-selector.service';

export enum LicenseErrorType {
    UserLicense = 1000,
    AgentLicense = 2000,
    PersonLicense = 3000
}

const AUTH_TOKEN = 'auth_token';

export enum LoginType {
    USER = 1,
    CUSTOMER,
    BOTH,
    PERSON
}


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    #companySelectorSrv = inject(CompanySelectorService);
    #httpSrv = inject(HttpService);
    #router = inject(Router);
    #mainPageSrv = inject(MainPageService);
    readonly #EMPTY_USER: UserInfo = {
        user: { id: 0, description: null, fullName: null, manager: false, blocked: false }
    };
    private _customerLogin: LoginType = LoginType.USER;
    public appCtx: AppContext = null;
    public connectionError = false;
    public errorMessage: string | null = null;
    public wrongData = false;
    public errorCode = 0;
    public licenseErrorType: LicenseErrorType = null;
    public baseURL: string = 'test';


    get isLoggedIn(): boolean {
        return this.appCtx != null && (this.appCtx.id !== null || this.appCtx.agentId != null || this.appCtx.personId != null);
    }

    public setContext(info: LoginInfo) {
        this.appCtx = info.ctx;
        this.#httpSrv.updateAuthToken(info.jwt);
    }

    public loadContext(): Observable<LoginInfo> {
        return this.#httpSrv.get<LoginInfo>('/relogin')
            .pipe(
                tap((info: LoginInfo) => this.setContext(info)),
                catchError(() => of(null)));
    }

    // todo: fix auto login
    // public reLogin(): Observable<boolean> {
    //     return this.#httpSrv
    //         .init()
    //         .pipe(switchMap(_ => this.#httpSrv.get<LoginInfo>('/relogin')),
    //             tap((info: LoginInfo) => this.setContext(info)),
    //             catchError(err => of(false)),
    //             map(_ => {
    //                 const failure: boolean = !this.appCtx || (this.appCtx.id == null && this.appCtx.agentId == null);
    //                 if (failure) {
    //                     this.#router.navigate(['/login']);
    //                 }
    //                 return !failure;
    //             }));
    // }

    // public isUserLogin(): boolean {
    //     return this.appCtx != null;
    // }
    //
    // public isAgentLogin(): boolean {
    //     return this.appCtx && this.appCtx.agentId !== null;
    // }
    //

    public reload(): Observable<AppContext> {
        this.#httpSrv.init();
        return (this.appCtx) ? of(this.appCtx) :
            this.#httpSrv.getAuthToken() ?
                this.#httpSrv
                    .init()
                    .pipe(switchMap(() => this.#httpSrv.get<LoginInfo>('/ctx')),
                        tap((info: LoginInfo) => this.setContext(info)),
                        map(() => this.appCtx),
                        catchError(err => {
                            if (err.status !== 401) {
                                throw err;
                            }
                            return of(null);
                        })
                    ) : of(null);
    }


    public centerLogin(center: number): Observable<LoginInfo> {
        return this
            .#httpSrv
            .put('/clogin/' + center)
            .pipe(tap<LoginInfo>(info => this.setContext(info)));
    }

    public async logout(): Promise<any> {
        const promise = this.#router && !this.#companySelectorSrv.homePage ? this.#router.navigate(['/' + LOGIN_URL]).then() : Promise.resolve(true).then();
        const fulfilled = await promise;
        if (fulfilled) {
            this.errorMessage = null;
            this.#mainPageSrv.clear();
            this.appCtx = null;
            localStorage.removeItem(AUTH_TOKEN);
            if (this.#companySelectorSrv.homePage) {
                window.location.href = this.#companySelectorSrv.homePage;
            }
        }
    }

    public clear() {
        this.#mainPageSrv.clear();
        this.appCtx = null;
        localStorage.removeItem(AUTH_TOKEN);
        this.#companySelectorSrv.clear();
    }

    public setLanguage(lang: string): Observable<any> {
        return this.appCtx ?
            this.#httpSrv.put('/lang?lang=' + lang)
                .pipe(tap((info: LoginInfo) => this.setContext(info))) : of(null);
    }

    public userLogin(user: { username: string, password: string }, isAndroid: boolean, onFinish?: () => void) {
        this.wrongData = false;
        this.licenseErrorType = null;
        this
            .#httpSrv
            .doLogin('/login', user)
            .subscribe({
                next: (info: LoginInfo) => {
                    this.setContext(info);
                    if (!this.licenseErrorType) {
                        // const url = this.appCtx.center ? INDEX_PAGE_URL : CENTER_SELECT_URL;
                        this.#router.navigate(['/' + CENTER_SELECT_URL]).then();
                    }
                },
                error: err => {
                    this.errorMessage = err?.message || null;
                    this.connectionError = err.status === 0;
                    this.wrongData = !this.connectionError;
                    if (onFinish != null) {
                        onFinish();
                    }
                },
                complete: () => {
                    if (onFinish != null) {
                        onFinish();
                    }
                }
            });
    }

    public refresh(cr: Credentials): Observable<LoginInfo> {
        const url =
            this.customerLogin === LoginType.CUSTOMER ? '/customers/login' :
                this.customerLogin === LoginType.USER ? '/login' : '/persons/login';
        return this.#httpSrv
            .doLogin(url, cr)
            .pipe(
                tap(info => {
                    this.#httpSrv.updateAuthToken(info.jwt);
                    this.appCtx = info.ctx;
                }));
    }

    public anonymous() {
        this.wrongData = false;
        this.licenseErrorType = null;
        return this
            .#httpSrv
            .init()
            .pipe(switchMap(_ => this.#httpSrv.anonymous()),
                tap((info: LoginInfo) => {
                    this.#httpSrv.updateAuthToken(info.jwt);
                    this.appCtx = info.ctx;
                }),
                catchError(err => {
                    this.connectionError = err.status === 0;
                    this.wrongData = !this.connectionError;
                    this.errorCode = err.status;
                    throw err;
                }));
    }

    // public userOrCustomerLogin(user: {
    //     username: string,
    //     password: string
    // }, isAndroid: boolean, onFinish?: () => void) {
    //     this.wrongData = false;
    //     this.licenseErrorType = null;
    //     this
    //         .#httpSrv
    //         .doLogin('/login', user)
    //         .subscribe({
    //             next: (info: LoginInfo) => {
    //                 this.#httpSrv.updateAuthToken(info.jwt);
    //                 this.appCtx = info.ctx;
    //                 if (!this.licenseErrorType) {
    //                     const url = this.appCtx.center ? INDEX_PAGE_URL : CENTER_SELECT_URL;
    //                     this.#router.navigate(['/' + CENTER_SELECT_URL]);
    //                 }
    //             },
    //             error: err => this.agentLogin('/customers/login', user, isAndroid, onFinish),
    //             complete: () => {
    //                 if (onFinish != null) {
    //                     onFinish();
    //                 }
    //             }
    //         });
    // }


    public agentLogin(url: string, credential: {
        username: string,
        password: string
    }, isAndroid: boolean, onFinish?: () => void) {
        this.baseURL = this.#httpSrv.baseUrl;
        this.licenseErrorType = null;
        this.wrongData = false;
        this.#httpSrv
            .doLogin(url, credential)
            .subscribe({
                next:
                    (info: LoginInfo) => {
                        this.#httpSrv.updateAuthToken(info.jwt);
                        this.appCtx = info.ctx;
                        //const url = this.appCtx?.center ? INDEX_PAGE_URL : CENTER_SELECT_URL;
                        //this.#router.navigate(['/' + CENTER_SELECT_URL]);
                        this.resetCode(info.ctx.agentId).subscribe((res) => {
                            const url = res.code != '' ? UPDATE_PASSWORD_URL : CENTER_SELECT_URL;
                            this.#router.navigate(['/' + url]).then();
                        });
                        if (onFinish != null) {
                            onFinish();
                        }
                    },
                error: () => {
                    this.wrongData = true;
                    if (onFinish != null) {
                        onFinish();
                    }
                    // throw err;
                },
                complete: () => {
                    if (onFinish != null) {
                        onFinish();
                    }
                }
            }
        );
    }


    public updateAgentLicense(license: string): Observable<number> {
        return this.#httpSrv.put('/agents/license', { license });
    }

    public updatePersonMobile(license: string): Observable<number> {
        return this.#httpSrv.put('/persons/mobile', { mobile: license });
    }

    getUserById(id: number): Observable<UserInfo> {
        const nId = id || 0;
        return id ?
            this.#httpSrv.get<UserInfo>(`/users/${nId}/info`) :
            of(this.#EMPTY_USER);

    }


    get customerLogin(): LoginType {
        return this._customerLogin;
    }

    set customerLogin(value: LoginType) {
        this._customerLogin = value;
    }

    updateAuthToken(jwt: string) {
        this.#httpSrv.updateAuthToken(jwt);
    }


    getAppParam(key: string): string {
        return this.appCtx?.params?.get(key);
    }

    ctx(): Observable<AppContext> {
        return this.#httpSrv.get<any>('/ctx').pipe(map(res => res['ctx']));
    }

    sendCode(code: number, message: ESender): Observable<any> {
        return this.#httpSrv.post('/email', message);
    }

    setVerified(): Observable<any> {
        return this.#httpSrv.post('/verified');
    }

    public resetCode(agent: number) {
        return this.#httpSrv.get<{ code: string }>(`/agents/${agent}/reset-code`);
    }


}

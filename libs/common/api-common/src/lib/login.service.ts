import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AppContext, LoginInfo, UserInfo} from './models';
import {DecService} from './dec.service';
import {CENTER_SELECT_URL, INDEX_PAGE_URL, LOGIN_URL} from './constants';
import {HttpService} from './http.service';
import {MainPageService} from './main-page.service';

export enum LicenseErrorType {
    UserLicense = 1000,
    AgentLicense = 2000,
    PersonLicense = 3000
}

const APP_CTX = 'APP_CTX';
const AUTH_TOKEN = 'auth_token';

export enum LoginType {
    USER = 1,
    CUSTOMER,
    BOTH
}


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly EMPTY_USER: UserInfo = {
        user: {id: 0, description: null, fullName: null, manager: false, blocked: false},
    };
    public appCtx: AppContext = null;
    public connectionError = false;
    public wrongData = false;
    public licenseErrorType: LicenseErrorType = null;
    private _customerLogin:LoginType  = LoginType.USER;
    constructor(private httpSrv: HttpService,
                private decSrv: DecService,
                public router: Router,
                private mainPageSrv: MainPageService) {
    }

    get isLoggedIn(): boolean {
        return this.appCtx != null && (this.appCtx.id !== null || this.appCtx.agentId != null || this.appCtx.personId != null);
    }

    public setContext(info: LoginInfo) {
        this.appCtx = info.ctx;
        this.httpSrv.updateAuthToken(info.jwt);
    }

    public loadContext(): Observable<LoginInfo> {
        return this.httpSrv.get<LoginInfo>('/relogin')
            .pipe(
                tap((info: LoginInfo) => {
                    this.appCtx = info.ctx;
                    this.httpSrv.updateAuthToken(info.jwt);
                }), catchError(err => of(null)));
    }

    // todo: fix auto login
    public reLogin(): Observable<boolean> {
        return this.httpSrv
            .init()
            .pipe(switchMap(_ => this.httpSrv.get<LoginInfo>('/relogin')),
                tap((info: LoginInfo) => {
                    this.appCtx = info.ctx;
                    this.httpSrv.updateAuthToken(info.jwt);
                }),
                catchError(err => of(false)),
                map(_ => {
                    const failure: boolean = !this.appCtx || (this.appCtx.id == null && this.appCtx.agentId == null);
                    if (failure) {
                        this.router.navigate(['/login']);
                    }
                    return !failure;
                }));
    }

    public isUserLogin(): boolean {
        return this.appCtx != null;
    }

    public isAgentLogin(): boolean {
        return this.appCtx && this.appCtx.agentId !== null;
    }

    public reload(): Observable<AppContext> {
        this.httpSrv.init();
        return  (this.appCtx)? of (this.appCtx) :
            this.httpSrv.getAuthToken()?
            this.httpSrv
                .get<LoginInfo>('/ctx')
                .pipe(
                    tap(info => {
                        this.httpSrv.updateAuthToken(info.jwt);
                        this.appCtx = info.ctx;
                    }),
                    map(() => this.appCtx),
                    catchError(err => {
                        if (err.status !== 401) {
                            throw err;
                        }
                        return of (null);
                    })
                ) : of(null);
    }

    public updateCtx(info: LoginInfo) {
        this.httpSrv.updateAuthToken(info.jwt);
        this.appCtx = info.ctx;
    }

    public centerLogin(center: number): Observable<LoginInfo> {
        return this
            .httpSrv
            .put('/clogin/' + center)
            .pipe(tap<LoginInfo>(info => {
                this.httpSrv.updateAuthToken(info.jwt);
                this.appCtx = info.ctx;
            }));
    }

    public logout(): Promise<any> {
        return this.router.navigate(['/' + LOGIN_URL])
            .then(fulfilled => {
                if (fulfilled) {
                    this.mainPageSrv.clear();
                    this.appCtx = null;
                    localStorage.removeItem(AUTH_TOKEN);
                }
            });
    }


    public setLanguage(lang: string): Observable<any> {
        return this.appCtx ?
        this.httpSrv.put('/lang?lang=' + lang)
            .pipe(tap((info: LoginInfo) => {
                this.httpSrv.updateAuthToken(info.jwt);
                this.appCtx = info.ctx;
            })) : of(null);
    }

    public userLogin(user: { username: string, password: string }, isAndroid: boolean, onFinish?: () => void) {
        this.wrongData = false;
        this.licenseErrorType = null;
        this
            .httpSrv
            .doLogin('/login', user)
            .subscribe({
                next: (info: LoginInfo) => {
                    this.httpSrv.updateAuthToken(info.jwt);
                    this.appCtx = info.ctx;
                    if (!this.licenseErrorType) {
                        const url = this.appCtx.center? INDEX_PAGE_URL: CENTER_SELECT_URL;
                        this.router.navigate(['/' + CENTER_SELECT_URL]);
                    }
                },
                error: err => {
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

    public userOrCustomerLogin(user: { username: string, password: string }, isAndroid: boolean, onFinish?: () => void) {
        this.wrongData = false;
        this.licenseErrorType = null;
        this
            .httpSrv
            .doLogin('/login', user)
            .subscribe({
                next: (info: LoginInfo) => {
                    this.httpSrv.updateAuthToken(info.jwt);
                    this.appCtx = info.ctx;
                    if (!this.licenseErrorType) {
                        const url = this.appCtx.center? INDEX_PAGE_URL: CENTER_SELECT_URL;
                        this.router.navigate(['/' + CENTER_SELECT_URL]);
                    }
                },
                error: err => this.agentLogin(user, isAndroid, onFinish),
                complete: () => {
                    if (onFinish != null) {
                        onFinish();
                    }
                }
            });
    }


    public agentLogin(user: { username: string, password: string }, isAndroid: boolean, onFinish?: () => void) {
        this.licenseErrorType = null;
        this.wrongData = false;
        this.httpSrv
            .doLogin('/customers/login', user)
            .pipe(
                tap(info => {
                    this.httpSrv.updateAuthToken(info.jwt);
                    this.appCtx = info.ctx;
                })
            ).subscribe({
                next:
                    (info: LoginInfo) => {
                        this.httpSrv.updateAuthToken(info.jwt);
                        this.appCtx = info.ctx;
                        const url = this.appCtx?.center ? INDEX_PAGE_URL : CENTER_SELECT_URL;
                        this.router.navigate(['/' + CENTER_SELECT_URL]);
                        if (onFinish != null) {
                            onFinish();
                        }
                    },
                error:
                    err => {
                        this.wrongData = true;
                        if (onFinish != null) {
                            onFinish();
                        }
                        throw err;
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
        return this.httpSrv.put('/agents/license', {license});
    }

    public updatePersonMobile(license: string): Observable<number> {
        return this.httpSrv.put('/persons/mobile', {mobile: license});
    }

    getUserById(id: number): Observable<UserInfo> {
        const nId = id || 0;
        return id ?
            this.httpSrv.get<UserInfo>(`/users/${nId}/info`) :
            of(this.EMPTY_USER);
    }


    get customerLogin(): LoginType {
        return this._customerLogin;
    }

    set customerLogin(value: LoginType) {
        this._customerLogin = value;
    }

    updateAuthToken(jwt: string) {
        this.httpSrv.updateAuthToken(jwt);
    }


    getAppParam(key: string): string {
        return this.appCtx?.params?.get(key);
    }
    ctx(): Observable<AppContext> {
        return this.httpSrv.get<any>('/ctx').pipe(map(res => res['ctx']));
    }
}

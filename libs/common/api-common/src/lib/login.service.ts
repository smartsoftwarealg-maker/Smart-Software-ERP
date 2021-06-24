import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Agent, AppContext, LoginInfo, Person, User, UserInfo} from './models';
import {DecService} from './dec.service';
import {ABS_INDEX_URL, CENTER_SELECT_URL, INDEX_PAGE_URL, LOGIN_URL} from './constants';
import {HttpService} from './http.service';
import {AppContextService} from './app-context.service';
import {UserRightsService} from './user-rights.service';
import {MainPageService} from './main-page.service';

export enum LicenseErrorType {
    UserLicense = 1000,
    AgentLicense = 2000,
    PersonLicense = 3000
}


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly EMPTY_USER: UserInfo = {
        user: {id: 0, description: null, fullName: null, manager: false, blocked: false},
    };
    private _userInfo: UserInfo = null;
    public agent: Agent = null;
    public person: Person = null;
    public user: User = null;
    public appCtx: AppContext = null;
    public hasPassword = false;
    public wrongData = false;
    public licenseErrorType: LicenseErrorType = null;
    private loggedIn = false;
    private tryAgent = false;
    private tryPerson = true;
    private _customerLogin = false;

    constructor(private httpSrv: HttpService,
                private decSrv: DecService,
                public router: Router,
                private contextSrv: AppContextService,
                private rightsSrv: UserRightsService,
                private mainPageSrv: MainPageService) {
    }

    get isLoggedIn(): boolean {
        return this.loggedIn;
    }

    // todo: fix auto login
    public reLogin(): Observable<boolean> {
        // FIXME: should not call httpSrv.init() as it should only be called in app.component
        return this.httpSrv
            .init()
            .pipe(switchMap(_ => this.httpSrv.get<any>('/relogin')),
                tap(_ => this.loginFromStorage()),
                catchError(err => of(false)),
                switchMap(_ => this.loadUser()),
                switchMap(_ => this.contextSrv.load()),
                switchMap(_ => this.rightsSrv.load()),
                map(_ => {
                    const failure: boolean = !this.agent && !this.person && !this.loggedIn;
                    if (failure) {
                        this.router.navigate(['/login']);
                    }
                    return !failure;
                }));
    }

    public isUserLogin(): boolean {
        return this.user != null;
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
                this.httpSrv.updateAuthToken(res.payload);
                this.agent = agent;
                localStorage.setItem('agent', JSON.stringify(this.agent));
                this.contextSrv.context.agentId = agent.id;
            });
    }

    public centerLogin(center: number): Observable<string> {
        return this
            .httpSrv
            .put('/clogin/' + center)
            .pipe(tap<string>(res => this.httpSrv.updateAuthToken(res)));
    }

    public logout() {
        this.router.navigate(['/' + LOGIN_URL])
            .then(fulfilled => {
                if (fulfilled) {
                    this.loggedIn = false;
                    this.hasPassword = false;
                    this.agent = null;
                    this.person = null;
                    this.user = null;
                    this._userInfo = this.EMPTY_USER;
                    this.contextSrv.clear();
                    // localStorage.clear();
                    this.rightsSrv.clear();
                    this.mainPageSrv.clear();
                    localStorage.removeItem('auth_token');
                }
            });
    }

    public loginFromStorage() {
        this.loggedIn = true;
        this.hasPassword = 'true' === localStorage.getItem('has-pwd');
        this.loadAgentFromStorage();
        this.loadPersonFromStorage();
    }

    public userLogin(user: { username: string, password: string }, isAndroid: boolean, onFinish?: () => void) {
        this.loggedIn = false;
        this.wrongData = false;
        this.licenseErrorType = null;
        this
            .httpSrv
            .doLogin('/login', user)
            .pipe(switchMap((info: LoginInfo) => {
                this.httpSrv.updateAuthToken(info.jwt);
                HttpService.setAuthToken(info.jwt);
                this.appCtx = info.ctx;
                return this.httpSrv
                    .get<any>('/cuser') //User login
                    .pipe(tap((usr) => {
                        const valid = !isAndroid || this.decSrv.isValidLicense(usr.androidLicense, usr.description);
                        if (!valid) {
                            this.licenseErrorType = LicenseErrorType.UserLicense;
                            this.wrongData = false;
                        }
                        this.user = usr;
                        return usr;
                    }));
            }))
            .subscribe({
                next: res => {
                    if (!this.licenseErrorType) {
                        this.loggedIn = true;
                        localStorage.setItem('userInfo-login', 'true');
                        this.hasPassword = user.password !== '';
                        localStorage.setItem('has-pwd', this.hasPassword + '');
                        const url = this.appCtx.center? INDEX_PAGE_URL: CENTER_SELECT_URL;
                        this.router.navigate(['/' + CENTER_SELECT_URL]);
                    }
                    if (onFinish != null) {
                        onFinish();
                    }
                },
                error: err => {
                    if (onFinish != null) {
                        onFinish();
                    }
                    this.wrongData = true;
                }
            });
    }


    private loadAgentFromStorage() {
        const agent = localStorage.getItem('agent');
        if (agent != null) {
            this.agent = JSON.parse(agent);
        }
        if (!this.agent || this.agent.id == null) {
            this.agent = null;
            localStorage.removeItem('agent');
        }
    }

    private loadPersonFromStorage() {
        const person = localStorage.getItem('person');
        if (person != null) {
            this.person = JSON.parse(person);
        }
        if (!this.person || this.person.id == null) {
            this.person = null;
            localStorage.removeItem('person');
        }
    }

    public agentLogin(user: { username: string, password: string }, isAndroid: boolean, onFinish?: () => void) {
        this.licenseErrorType = null;
        this.wrongData = false;
        this.httpSrv
            .doLogin('/customers/login', user)
            //.pipe(tap(jwt => localStorage.setItem('auth_token', jwt)),
            .pipe(
                tap(info => {
                    this.httpSrv.updateAuthToken(info.jwt);
                    this.httpSrv.updateAuthToken(info.jwt);
                    this.appCtx = info.ctx;
                })
            ).subscribe({
                next:
                    (info: LoginInfo) => {
                        this.httpSrv.updateAuthToken(info.jwt);
                        const ctx = info.ctx;
                        this.agent = {
                            id: ctx?.agentId,
                            customerCode: ctx?.userName,
                            denomination: ctx?.fullName,
                        };
                        localStorage.setItem('agent', JSON.stringify(this.agent));
                        localStorage.setItem('has-pwd', this.hasPassword + '');
                        const url = this.appCtx?.center ? INDEX_PAGE_URL : CENTER_SELECT_URL;
                        this.router.navigate(['/' + CENTER_SELECT_URL]);
                        this.loggedIn = true;
                        this.hasPassword = user.password !== '';
                        if (onFinish != null) {
                            onFinish();
                        }
                    },
                error:
                    err => {
                        if (onFinish != null) {
                            onFinish();
                        }
                        this.wrongData = true;
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


    get userInfo(): UserInfo {
        return this._userInfo;
    }

    getUserById(id: number): Observable<UserInfo> {
        const nId = id || 0;
        return id ?
            this.httpSrv.get<UserInfo>(`/users/${nId}/info`) :
            of(this.EMPTY_USER);
    }

    loadUser(): Observable<UserInfo> {
            return this
                .httpSrv
                .get<User>('/cuser')
                .pipe(switchMap(res => this.getUserById(res.id)))
                .pipe(tap((res: UserInfo) => {
                        this._userInfo = res;
                        localStorage.setItem('cuser', JSON.stringify(res));
                    }));
    }

    get customerLogin() {
        return this._customerLogin;
    }

    set customerLogin(value: boolean) {
        this._customerLogin = value;
    }
}

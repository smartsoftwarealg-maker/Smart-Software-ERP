import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {UserService} from './user.service';
import {Agent, Person, User, UserInfo} from './models';
import {DecService} from './dec.service';
import {ABS_INDEX_URL, CENTER_SELECT_URL, LOGIN_URL} from './constants';
import {HttpService} from './http.service';
import {AppContextService} from './app-context.service';
import {UserRightsService} from './user-rights.service';
import {MainPageService} from '@ss/common/ui-main-page';

export enum LicenseErrorType {
    UserLicense = 1000,
    AgentLicense = 2000,
    PersonLicense = 3000
}

export interface PersonResponse {
    person: Person;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    public agent: Agent = null;
    public person: Person = null;
    public user: User;
    public hasPassword = false;
    public wrongData = false;
    public licenseErrorType: LicenseErrorType = null;
    private loggedIn = false;
    private tryAgent = true;
    private tryPerson = true;

    constructor(private httpSrv: HttpService,
                public userSrv: UserService,
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
                switchMap(_ => this.userSrv.load()),
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
                    this.userSrv.clear();
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
            .pipe(switchMap((jwt: string) => {
                this.httpSrv.updateAuthToken(jwt);
                // localStorage.setItem('auth_token', jwt);
                return this.httpSrv
                    .get<any>('/cuser')
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
            .subscribe(res => {
                if (!this.licenseErrorType) {
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
                    } else if (this.tryAgent) {
                        this.agentLogin(user, isAndroid, onFinish);
                    } else if (this.tryPerson) {
                        this.personLogin(user, isAndroid, onFinish);
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
            .doLogin('/agents/login', user)
            // .pipe(tap(jwt => localStorage.setItem('auth_token', jwt)),
            .pipe(
                tap(jwt => this.httpSrv.updateAuthToken(jwt)),
                switchMap(jwt =>
                    this.httpSrv
                        .get<Agent>('/agents/name')
                        .pipe(tap((agent: Agent) => {
                            const valid = !isAndroid || this.decSrv.isValidLicense(agent.license, agent.code);
                            if (!valid) {
                                this.licenseErrorType = LicenseErrorType.AgentLicense;
                                this.wrongData = false;
                            }
                        }))
                )
            ).subscribe((agent: Agent) => {
                if (!this.licenseErrorType) {
                    this.agent = agent;
                    localStorage.setItem('agent', JSON.stringify(this.agent));
                    this.hasPassword = user.password !== '';
                    localStorage.setItem('has-pwd', this.hasPassword + '');
                    this.loggedIn = true;
                    this.router.navigate(['/' + CENTER_SELECT_URL]);
                }
                if (onFinish != null) {
                    onFinish();
                }
            }, err => {
                if (onFinish != null) {
                    onFinish();
                }
                if (err.status === 401) {
                    this.wrongData = !this.licenseErrorType;
                } else {
                    throw err;
                }
            }
        );
    }

    public personLogin(user: { username: string, password: string }, isAndroid: boolean, onFinish?: () => void) {
        this.httpSrv
            .doLogin2('/persons/login', user)
            // .pipe(tap(res => localStorage.setItem('auth_token', res.jwt)),
            .pipe(
                tap(res => this.httpSrv.updateAuthToken(res.jwt)),
                switchMap(res =>
                    this.httpSrv
                        .get<PersonResponse>('/persons/current')
                        .pipe(map(person => person.person))
                )
            ).subscribe((person: Person) => {
                if (person) {
                    const isValid = !isAndroid || this.decSrv.isValidLicense(person.license, person.customCode);
                    if (isValid) {
                        this.person = person;
                        localStorage.setItem('person', JSON.stringify(this.person));
                        this.hasPassword = user.password !== '';
                        this.loggedIn = true;
                        localStorage.setItem('has-pwd', this.hasPassword + '');
                        this.router.navigate(['/' + CENTER_SELECT_URL]);
                    } else {
                        this.licenseErrorType = LicenseErrorType.PersonLicense;
                        this.wrongData = false;
                    }
                }
                if (onFinish != null) {
                    onFinish();
                }
            }, err => {
                if (onFinish != null) {
                    onFinish();
                }
                if (err.status === 401) {
                    this.wrongData = !this.licenseErrorType;
                } else {
                    throw  err;
                }
            }
        );
    }

    public updateUserLicense(license: string): Observable<number> {
        return this.httpSrv.put('/users/license', {license});
    }

    public updatePersonLicense(license: string): Observable<number> {
        return this.httpSrv.put('/persons/license', {license});
    }

    public updateAgentLicense(license: string): Observable<number> {
        return this.httpSrv.put('/agents/license', {license});
    }

    public updatePersonMobile(license: string): Observable<number> {
        return this.httpSrv.put('/persons/mobile', {mobile: license});
    }

    public updateAgentMobile(license: string): Observable<number> {
        return this.httpSrv.put('/agents/mobile', {mobile: license});
    }

    public skipLogin(): void {
        if (this.isLoggedIn) {
            this.router.navigate([ABS_INDEX_URL]);
        }
    }

    get userInfo(): UserInfo {
        return this.userSrv.userInfo;
    }

    loadUser(): Observable<any> {
        return this.userSrv.load();
    }
}

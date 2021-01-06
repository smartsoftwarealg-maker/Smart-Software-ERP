import {Injectable} from '@angular/core';
import {map, switchMap, tap} from 'rxjs/operators';
import {DocRight, Right, User, UserContext, UserInfo} from './models';
import {Observable, of} from 'rxjs';
import {HttpService} from './http.service';

interface Severe {
    severe: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {


    private readonly EMPTY_USER: UserInfo = {
        user: {id: 0, description: null, fullName: null, manager: false, blocked: false},
        centers: [],
        roles: []
    };
    private rightsMap: Map<string, Right> = new Map<string, Right>();
    private severe = false;
    public userInfo: UserInfo = null;
    public context: UserContext = null;
    public itemCount = 0;

    constructor(protected httpSrv: HttpService) {
        const user = localStorage.getItem('cuser');
        if (user) {
            this.userInfo = JSON.parse(user) as UserInfo;
        }
    }

    load(): Observable<any> {
        return this.getContext()
            .pipe(tap(res => this.context = res),
                switchMap(res => res.userId ? this.loadUserRights() : of(true)));
    }

    private getContext(): Observable<UserContext> {
        return this
            .httpSrv
            .get<UserContext>('/context')
            .pipe(switchMap(res => {
                let obs: Observable<UserContext> = null;
                if (res.agentId) {
                    res.manager = false;
                    obs = this
                        .httpSrv
                        .get<UserContext>(`/agents/${res.agentId}`)
                        .pipe(tap(next => {
                                res.fullName = next['denomination'];
                                res.pwdExpired = next && next.pwdExpired;
                            }),
                            map(() => res));
                } else {
                    if (res.personId) {
                        res.manager = false;
                        obs = this
                            .httpSrv
                            .get<Object>(`/persons/${res.personId}`)
                            .pipe(tap(next => {
                                res.fullName = next['firstName'] +
                                    ' ' +
                                    next['lastName'];
                            }), map(_ => res));
                    } else {
                        if (res.userId) {
                            obs = this
                                .httpSrv
                                .get<User>(`/login/users/${res.userId}`)
                                .pipe(tap((next: User) => {
                                    res.fullName = next.fullName;
                                }), map(_ => res));
                        }
                    }
                }
                return obs;
            }));
    }

    private loadUserRights(): Observable<any> {
        return this
            .httpSrv
            .get<User>('/cuser')
            .pipe(switchMap(res => this.getUserById(res.id)))
            .pipe(tap((res: UserInfo) => {
                    this.userInfo = res;
                    localStorage.setItem('cuser', JSON.stringify(res));
                }),
                switchMap(res => this.httpSrv.get<Severe>('/rights/severe')))
            .pipe(tap(res => this.severe = res.severe),
                switchMap(res => this.httpSrv.get<DocRight[]>('/rights')))
            .pipe(tap(res => {
                this.rightsMap = res.reduce((m, e) => {
                    m.set(e.document, e.right);
                    return m;
                }, new Map<string, Right>());
            }));
    }

    canUserPass(component: string): boolean {
        return this.getRights(component).read;
    }


    canUserAdd(component: string): boolean {
        return this.getRights(component).create;
    }

    canUserEdit(component: string): boolean {
        return this.getRights(component).edit;
    }

    canUserDelete(component: string): boolean {
        return this.getRights(component).del;
    }

    private getDefault(): Right {
        const manager = this.userInfo && this.userInfo.user.manager;
        return {
            read: manager || !this.severe,
            create: manager || !this.severe,
            edit: manager || !this.severe,
            del: manager || !this.severe
        };
    }

    getRights(component: string): Right {
        if (!component) {
            return this.getDefault();
        }
        return this.rightsMap.get(component) || this.getDefault();
    }


    /**
     * Called by logout() in LoginService
     */
    clear() {
        this.userInfo = null;
        this.context = null;
        // localStorage.clear();
        this.rightsMap.clear();
    }


    getUserById(id: number): Observable<UserInfo> {
        const nId = id || 0;
        return id ?
            this.httpSrv.get<UserInfo>(`/users/${nId}/info`) :
            of(this.EMPTY_USER);
    }


    get isLoggedIn(): boolean {
        return this.userInfo &&
            this.userInfo.user &&
            this.userInfo.user.id != null;
    }

}

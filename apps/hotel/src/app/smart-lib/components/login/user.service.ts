import {Injectable} from '@angular/core';
import {map, switchMap, tap} from 'rxjs/operators';
import {Center, DocRight, Right, Role, User, UserContext, UserInfo} from '../../common/models';
import {Observable, of} from 'rxjs';
import {HttpService} from '../../../smart-lib/common/http.service';

interface Severe {
    severe: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly EMPTY_USER: UserInfo = {
        user: { id: 0, description: null, fullName: null, manager: false, blocked: false },
        centers: [],
        roles: []
    };
    private rightsMap: Map<string, Right> = new Map<string, Right>();
    private severe = false;
    public userInfo: UserInfo = null;
    public context: UserContext = null;
    public itemCount = 0;

    constructor(private httpSrv: HttpService) {
        const user = localStorage.getItem('cuser');
        if (user) {
            this.userInfo = JSON.parse(user) as UserInfo;
        }
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
                            .get<any>(`/persons/${res.personId}`)
                            .pipe(tap(next => {
                                res.fullName = next['birthInfo']['firstName'] +
                                    ' ' +
                                    next['birthInfo']['lastName'];
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
            .pipe(switchMap(res => this.getUserById(res.id)),
                tap((res: UserInfo) => {
                    this.userInfo = res;
                    localStorage.setItem('cuser', JSON.stringify(res));
                }),
                switchMap(res => this.httpSrv.get<Severe>('/rights/severe')),
                tap(res => this.severe = res.severe),
                switchMap(res => this.httpSrv.get<DocRight[]>('/rights')),
                tap(res => {
                    this.rightsMap = res.reduce((m, e) => {
                        m.set(e.document, e.right);
                        return m;
                    }, new Map<string, Right>());
                }));
    }

    load(): Observable<any> {
        return this.getContext()
            .pipe(tap(res => this.context = res),
                switchMap(res => res.userId ? this.loadUserRights() : of(true)));
    }

    canUserPass(component: string): boolean {
        return this.getRights(component).read;
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

    getUserRights(component: string): Right {
        return this.getRights(component);
    }

    canUserAdd(component: string): boolean {
        return this.getRights(component).create;
    }

    canUserEdit(component: string): boolean {
        return this.getRights(component).edit;
    }

    UserRights(component: string): Right {
        return this.getRights(component);
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

    getUserList(page: number, size: number, cb: (cnt: number) => void, filter?: string, sort?: string): Observable<UserInfo[]> {
        const page0 = Math.max(0, page - 1);
        const strFilter = filter ? `&filter=${filter}` : '';
        const strSort = sort ? `&sort=${sort}` : '';
        const url = `/users?page=${page0}-${size}${strFilter}${strSort}`;
        return this.httpSrv.getData<UserInfo>('/users', page0, size, strFilter, strSort)
        //return this.httpSrv.get<UserInfo[]>(url)
        .pipe(
            tap((res: { itemCount: number, body: UserInfo[] }) => cb(res.itemCount)),
            map((res: { itemCount: number, body: UserInfo[] }) => res.body),
        );
    }

    getUserById(id: number): Observable<UserInfo> {
        const nId = id || 0;
        return id ?
            this.httpSrv.get<UserInfo>(`/users/${nId}/info`) :
            of(this.EMPTY_USER);
    }

    save(userInfo: UserInfo): Observable<number> {
        return userInfo.user.id ?
            this.httpSrv.put('/users', userInfo) :
            this.httpSrv.post('/users', userInfo);
    }

    getRoleList(): Observable<Role[]> {
        return this.httpSrv.get<Role[]>('/lookups/roles');
    }

    getCenterList(): Observable<Center[]> {
        const company = this.context ? this.context.company : 1;
        return this.httpSrv.get<Center[]>(`/companies/${company}/centers`);
    }

    get isLoggedIn(): boolean {
        return this.userInfo &&
            this.userInfo.user &&
            this.userInfo.user.id != null;
    }

    ctx(): Observable<any> {
        return this.httpSrv.get<any>('/ctx').pipe(map(res => res['ctx']));
    }
}

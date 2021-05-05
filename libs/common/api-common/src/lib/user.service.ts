import {Injectable} from '@angular/core';
import {switchMap, tap} from 'rxjs/operators';
import {DocRight, Right, User, UserInfo} from './models';
import {Observable, of} from 'rxjs';
import {HttpService} from './http.service';
import {AppContextService} from './app-context.service';

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
    public itemCount = 0;

    constructor(protected httpSrv: HttpService,
                private contextSrv: AppContextService) {
        const user = localStorage.getItem('cuser');
        if (user) {
            this.userInfo = JSON.parse(user) as UserInfo;
        }
    }

    // load(): Observable<any> {
    //     return this.contextSrv
    //         .getContext()
    //         .pipe(switchMap(res => res.userId ? this.loadUserRights() : of(true)));
    // }

    public load(): Observable<UserInfo> {
        return this
            .httpSrv
            .get<User>('/cuser')
            .pipe(switchMap(res => this.getUserById(res.id)))
            .pipe(tap((res: UserInfo) => {
                    this.userInfo = res;
                    localStorage.setItem('cuser', JSON.stringify(res));
                }));
    }

    canUserPass_(component: string): boolean {
        return this.getUserRights(component).read;
    }

    canUserAdd_(component: string): boolean {
        return this.getUserRights(component).create;
    }

    canUserEdit_(component: string): boolean {
        return this.getUserRights(component).edit;
    }

    canUserDelete_(component: string): boolean {
        return this.getUserRights(component).del;
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

    getUserRights(component: string): Right {
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
        this.contextSrv.clear();
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

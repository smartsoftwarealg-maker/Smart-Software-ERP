import { Center, UserInfo, Right, Role, UserContext } from '../../common/models';
import { Observable } from 'rxjs';
import { HttpService } from "../../common/http.service";
export declare class UserService {
    private httpSrv;
    private readonly EMPTY_USER;
    private rightsMap;
    private severe;
    userInfo: UserInfo;
    context: UserContext;
    itemCount: number;
    constructor(httpSrv: HttpService);
    private getContext;
    private loadUserRights;
    load(): Observable<any>;
    canUserPass(component: string): boolean;
    private getDefault;
    getRights(component: string): Right;
    getUserRights(component: string): Right;
    canUserAdd(component: string): boolean;
    canUserEdit(component: string): boolean;
    UserRights(component: string): Right;
    /**
     * Called by logout() in LoginService
     */
    clear(): void;
    getUserList(page: number, size: number, cb: (cnt: number) => void, filter?: string, sort?: string): Observable<UserInfo[]>;
    getUserById(id: number): Observable<UserInfo>;
    save(userInfo: UserInfo): Observable<number>;
    getRoleList(): Observable<Role[]>;
    getCenterList(): Observable<Center[]>;
    readonly isLoggedIn: boolean;
    ctx(): Observable<object>;
}

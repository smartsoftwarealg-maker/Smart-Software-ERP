import {Injectable} from '@angular/core';
import {User, USER_URL} from './user-api';
import {Center, HttpService, Role, UserCenter, UserRole} from '@ss/common/api-common';
import {BaseEntityExtendedService} from "@ss/common/api-base-entity";
import {Observable, of} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseEntityExtendedService<User> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, USER_URL);
    }

    public updatePassword(user: User): Observable<{ count: number } > {
        return this.httpSrv.post('/password', user);
    }

    loadRoles(userId: number): Observable<UserRole[]> {
        const url = `/users/${userId}/roles`;
        return this.httpSrv.get<UserRole[]>(url);
    }

    loadCenters(userId: number): Observable<UserCenter[]> {
        const url = `/users/${userId}/centers`;
        return this.httpSrv.get<UserCenter[]>(url);
    }

    addRole(userId: number, role: number): Observable<{ count: number }> {
        return userId && role ?
            this.httpSrv.post(`/users/${userId}/roles`,
                { id: 0, userId: userId, roleId: role} ) :
            of({ count: 0});
    }

    deleteRole(userId: number, roleId: number): Observable<{ count: number }> {
        return userId && roleId ?
            this.httpSrv.removeById(`/users/${userId}/roles`, roleId ) :
            of({ count: 0});
    }

    addCenter(userId: number, center: number): Observable<{ count: number }> {
        return userId && center ?
            this.httpSrv.post(`/users/${userId}/centers`,
                { id: 0, userId: userId, centerId: center} ) :
            of({ count: 0});
    }

    deleteCenter(userId: number, center: number): Observable<{ count: number }> {
        return userId && center ?
            this.httpSrv.removeById(`/users/${userId}/centers`, center ) :
            of({ count: 0});
    }
}

import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpService} from './http.service';
import {Password, User, UserCenter, UserRole} from './models';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(protected httpSrv: HttpService) {}

    public updatePassword(user: Password): Observable<{ count: number } > {
        return this.httpSrv.post('/password', user);
    }

    loadCenters(userId: number): Observable<UserCenter[]> {
        const url = `/users/${userId}/centers`;
        return this.httpSrv.get<UserCenter[]>(url);
    }
    getAll(ids: number[]): Observable<User[]> {
        return this.httpSrv.get<User[]>('/users');
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

    loadRoles(id: number): Observable<UserRole[]> {
        return this.httpSrv.get<UserRole[]>(`/users/${id}/roles`);
    }
}

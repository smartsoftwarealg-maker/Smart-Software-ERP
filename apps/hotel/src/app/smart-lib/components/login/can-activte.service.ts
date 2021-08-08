import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { LOGIN_URL, PROFILE_PAGE_URL } from './login-constants';
import { HttpService } from '../../../smart-lib/common/http.service';

@Injectable()
export class CanActivateService implements CanActivate {
    constructor(public router: Router,
        protected httpSrv: HttpService,
        private loginSrv: LoginService,
        private userSrv: UserService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        console.log('Testing...');
        if (this.loginSrv.isLoggedIn) {
            return this.canRead(route);
        }
        // const auth = localStorage.getItem('auth_token') != null;
        const auth = this.httpSrv.getAuthToken() != null;
        if (auth) {
            return this.loginSrv
                .reLogin()
                .pipe(map(res => res && this.canRead(route)));
        }
        console.log('Not logged in');
        this.router.navigate(['/' + LOGIN_URL]);
        return false;
    }

    private canRead(route: ActivatedRouteSnapshot): boolean {
        if (this.userSrv.context && this.userSrv.context.pwdExpired) {
            this.router.navigate(['/' + PROFILE_PAGE_URL]);
            return false;
        }
        const entity = route.data.entity;
        if (entity) {
            const rights = this.userSrv.getRights(entity);
            if (!rights.read) {
                return false;
            }
        }
        return true;
    }
}

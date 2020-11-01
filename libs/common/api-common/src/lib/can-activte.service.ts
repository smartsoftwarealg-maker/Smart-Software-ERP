import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { HttpService } from './http.service';
import { PROFILE_PAGE_URL, LOGIN_URL } from './constants';
import { UrlTree } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CanActivateService implements CanActivate {
    constructor(public router: Router,
        protected httpSrv: HttpService,
        private loginSrv: LoginService,
        private userSrv: UserService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.loginSrv.isLoggedIn) {
            return this.canRead(route);
        }

        const auth = this.httpSrv.getAuthToken() != null;
        if (auth) {
            return this.loginSrv
                .reLogin()
                .pipe(
                    map(res => res && this.canRead(route)),
                ).pipe(
                    catchError(() => of(this.router.createUrlTree(['/' + LOGIN_URL])))
                );
        }
        return this.router.createUrlTree(['/' + LOGIN_URL]);
    }

    private canRead(route: ActivatedRouteSnapshot): boolean {
        const entity = route.data.entity;

        if (entity && !this.userSrv.canUserPass(entity)) {
            return false;
        }

        if (this.userSrv.context && this.userSrv.context.pwdExpired) {
            this.router.navigate(['/' + PROFILE_PAGE_URL]).then();
            return false;
        }

        return true;
    }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { HttpService } from './http.service';
import { PROFILE_PAGE_URL, LOGIN_URL } from './constants';
import { UrlTree } from '@angular/router';
import { AppContextService } from './app-context.service';
import { UserRightsService } from './user-rights.service';

@Injectable({
    providedIn: 'root'
})
export class CanActivateService implements CanActivate {

    private requiredWork = () => of(null);
    private requiredWorkDone = false;

    constructor(public router: Router,
        protected httpSrv: HttpService,
        private loginSrv: LoginService,
        private rightsSrv: UserRightsService,
        private contextSrv: AppContextService) {
    }

    public requireLoading(work: () => Observable<any>) {
        this.requiredWork = work;
        this.requiredWorkDone = false;
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.loginSrv.isLoggedIn) {
            return this.requiredWorkDone
                ? this.canRead(route)
                : this.requiredWork().pipe(
                    tap(() => this.requiredWorkDone = true),
                    map(() => this.canRead(route))
                );
        } else {
            this.requiredWorkDone = false;
        }

        const auth = this.httpSrv.getAuthToken() != null;
        if (auth) {
            return this.loginSrv
                .reLogin()
                .pipe(
                    tap((loggedin: boolean) => {
                        if (!loggedin) {
                            throw new Error('Not logged in');
                        }
                    }),
                    switchMap(() => this.requiredWork().pipe(tap(() => this.requiredWorkDone = true))),
                    map(res => res && this.canRead(route)),
                ).pipe(
                    catchError(() => of(this.router.createUrlTree(['/' + LOGIN_URL])))
                );
        }
        return this.router.createUrlTree(['/' + LOGIN_URL]);
    }

    private canRead(route: ActivatedRouteSnapshot): boolean {
        const entity = route.data.entity;

        if (entity && !this.rightsSrv.canUserPass(entity)) {
            return false;
        }

        if (this.contextSrv &&
            this.contextSrv.context &&
            this.contextSrv.context.pwdExpired) {
            this.router.navigate(['/' + PROFILE_PAGE_URL]).then();
            return false;
        }

        return true;
    }

}

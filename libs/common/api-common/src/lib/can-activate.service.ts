import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { PROFILE_PAGE_URL, LOGIN_URL } from './constants';
import { UrlTree } from '@angular/router';
import { UserRightsService } from './user-rights.service';

@Injectable({
    providedIn: 'root'
})
export class CanActivateService implements CanActivate {
    constructor(public router: Router,
        protected httpSrv: HttpService,
        private loginSrv: LoginService,
        private rightsSrv: UserRightsService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.httpSrv
            .init()
            .pipe(switchMap(_ => this.loginSrv.reload()),
                map(_ =>  {
                    return (this.loginSrv.isLoggedIn && this.canRead(route)) ||
                        this.router.createUrlTree(['/' + LOGIN_URL]);
                }));
    }

    private canRead(route: ActivatedRouteSnapshot): boolean {
        const entity = route.data['entity'];

        if (entity && !this.rightsSrv.canUserPass(entity)) {
            return false;
        }

        if (!this.loginSrv.appCtx) {
            this.router.navigate(['/' + PROFILE_PAGE_URL]).then();
            return false;
        }
        return true;
    }
}

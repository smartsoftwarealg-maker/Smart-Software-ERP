import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { map, switchMap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { PROFILE_PAGE_URL, LOGIN_URL, UPDATE_PASSWORD_URL, AUTH_2FA_URL } from './constants';
import { UrlTree } from '@angular/router';
import { UserRightsService } from './user-rights.service';

@Injectable({
    providedIn: 'root'
})
export class CanActivateService {
    private router = inject(Router);
    private httpSrv = inject(HttpService);
    private loginSrv = inject(LoginService);
    private rightsSrv = inject( UserRightsService);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.httpSrv
            .init()
            .pipe(
                switchMap(() => this.loginSrv.reload()),
                switchMap(() => this.httpSrv.get<{'verify': boolean}>('/verified')),
                map(res => {
                    if (res.verify && !this.loginSrv?.appCtx?.verified) {
                        return this.loginSrv?.appCtx?.hasPassword ?
                            this.router.createUrlTree(['/' + AUTH_2FA_URL]) :
                            this.router.createUrlTree(['/' + UPDATE_PASSWORD_URL]);
                    }
                    return (this.loginSrv.isLoggedIn && this.loginSrv.appCtx !== null && this.canRead(route)) ||
                            this.router.createUrlTree(['/' + LOGIN_URL]);
                })
            );
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

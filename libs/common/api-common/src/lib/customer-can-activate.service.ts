import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { map, switchMap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { UPDATE_PASSWORD_URL, AUTH_2FA_URL } from './constants';
import { UrlTree } from '@angular/router';
import { UserRightsService } from './user-rights.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerCanActivateService {
    constructor(public router: Router,
        protected httpSrv: HttpService,
        private loginSrv: LoginService) {
    }

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
                    return (this.loginSrv.isLoggedIn && this.loginSrv.appCtx !== null) ||
                            this.router.createUrlTree(['/app/cspace/home']);
                })
            );
    }

}

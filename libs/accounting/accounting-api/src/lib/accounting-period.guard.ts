import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class AccountingPeriodGuard implements CanActivate {
    constructor(private loginSrv: LoginService, private router: Router) {
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.loginSrv.appCtx &&
               this.loginSrv.appCtx.accFile > 0 &&
               this.loginSrv.appCtx.accYear > 1000 ? true : this.router.createUrlTree(['/app/accounting/file-select']);
    }
}

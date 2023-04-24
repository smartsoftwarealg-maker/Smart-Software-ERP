import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '@ss/common/api-common';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import {ShellService} from '@ss/common/ui-shell';

@Injectable({
    providedIn: 'root'
})
export class PayrollMonthGuard {
    constructor(private loginSrv: LoginService,
                private router: Router,
                private monthSrv: PayrollMonthService,
                private shellSrv: ShellService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.loginSrv?.appCtx?.payMonth) {
            this.shellSrv.setLabels([this.monthSrv.getLabel()]);
        }
        return this.loginSrv?.appCtx &&
        this.loginSrv.appCtx?.payMonth > 100000 ? true :
            this.router.createUrlTree(['/app/payroll/select']);
    }
}

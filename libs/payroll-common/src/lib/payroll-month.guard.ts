import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class PayrollMonthGuard implements CanActivate {
    constructor(private loginSrv: LoginService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.loginSrv.appCtx &&
      this.loginSrv.appCtx.payMonth > 100000? true : this.router.createUrlTree(['/app/payroll/select']);
  }
}

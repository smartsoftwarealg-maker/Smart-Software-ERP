import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {LoginService} from "@ss/common/api-common";

@Injectable({
    providedIn: 'root'
})
export class CustomerSessionService implements CanActivate {
    constructor(private loginSrv: LoginService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.loginSrv.appCtx?.agentId != null;
    }
}

import {
    ActivatedRouteSnapshot,
    CanDeactivateFn,
    RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '@ss/common/api-common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

export const restCodeGuard: CanDeactivateFn<Component> = (
    component: Component,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const loginSrv = inject(LoginService);
    const id = loginSrv.appCtx?.agentId;
    return id && loginSrv.resetCode(id).pipe(map((res) => res.code == ''));
};

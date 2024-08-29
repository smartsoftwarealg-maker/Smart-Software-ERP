import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {CanActivateService} from '@ss/common/api-common';
import {inject} from '@angular/core';
import {AccountingPeriodGuard} from '@ss/accounting/accounting-api';
import {PayrollMonthGuard} from '@ss/payroll-common';
import {BudgetSelectorGuard} from '@ss/budget/budget';
import {AssignmentDetailGuard, TimingDetailGuard} from '@ss/attendance';
import { AssetUnidentifiedInventoryService } from '@ss/assets-component';
import { ProjectService } from '@ss/scheduled-sales/projects';


export const loginGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(CanActivateService).canActivate(route, state);

export const accountingGuard =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AccountingPeriodGuard).canActivate(route, state);

export const payrollGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(PayrollMonthGuard).canActivate(route, state);

export const budgetGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(BudgetSelectorGuard).canActivate(route, state);

export const detailGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AssignmentDetailGuard).canActivate(route, state);

export const timingGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(TimingDetailGuard).canActivate(route, state);

export const unidentifiedInventoryGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AssetUnidentifiedInventoryService).canActivate(route, state);

export const ssProjectGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(ProjectService).canActivate(route, state);

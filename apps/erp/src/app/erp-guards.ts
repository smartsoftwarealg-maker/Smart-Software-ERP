import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {CanActivateService} from '@ss/common/api-common';
import {inject} from '@angular/core';
import {AccountingPeriodGuard} from '@ss/accounting/accounting-api';
import {PayrollMonthGuard} from '@ss/payroll-common';
import {BudgetSelectorGuard} from '../../../../libs/budget/budget/src';

export const loginGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(CanActivateService).canActivate(route, state)

export const accountingGuard =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AccountingPeriodGuard).canActivate(route, state)

export const payrollGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(PayrollMonthGuard).canActivate(route, state)

export const budgetGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(BudgetSelectorGuard).canActivate(route, state)


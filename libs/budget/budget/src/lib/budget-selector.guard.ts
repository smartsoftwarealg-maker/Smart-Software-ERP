import { inject, Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {BudgetService} from './budget.service';
import {ShellService} from '@ss/common/ui-shell';

@Injectable({
    providedIn: 'root'
})
export class BudgetSelectorGuard {
    private budgetSrv = inject(BudgetService);
    private router    = inject(Router);
    private shellSrv  = inject(ShellService);

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.budgetSrv.budget) {
            this.shellSrv.setLabels([{ title: this.budgetSrv.budget?.description }]);
        }
        return this.budgetSrv.budget?.id > 0 ? true : this.router.createUrlTree(['/app/budget/budget-selector']);
    }
}

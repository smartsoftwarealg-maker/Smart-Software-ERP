import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {BudgetService} from './budget.service';
import {ShellService} from '@ss/common/ui-shell';

@Injectable({
    providedIn: 'root'
})
export class BudgetSelectorGuard {
    constructor(private budgetSrv: BudgetService,
                private router: Router,
                private shellSrv: ShellService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.budgetSrv.budget) {
            this.shellSrv.setLabels([{ title: this.budgetSrv.budget?.description }]);
        }
        return this.budgetSrv.budget?.id > 0 ? true : this.router.createUrlTree(['/app/budget/budget-selector']);
    }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {BudgetService} from './budget.service';

@Injectable({
    providedIn: 'root'
})
export class BudgetSelectorGuardGuard implements CanActivate {
    constructor(private budgetSrv: BudgetService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.budgetSrv.budget?.id > 0 ? true : this.router.createUrlTree(['/app/budget/budget-selector']);
    }
}

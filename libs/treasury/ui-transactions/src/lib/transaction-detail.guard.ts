import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TreasuryTransactionService} from '@ss/treasury/api-transactions';

@Injectable({
    providedIn: 'root'
})
export class TransactionDetailGuard implements CanActivate {
    constructor(private srv: TreasuryTransactionService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('id: ', this.srv.journalId);
        return this.srv.journalId? true : this.router.createUrlTree(['/app/treasury/transactions']);
    }

}

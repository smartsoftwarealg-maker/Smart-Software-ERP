import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Account, ACCOUNT_URL} from './account-api';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AccountService extends BaseEntityService<Account> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACCOUNT_URL);
    }

    budgetAccounts(filter?: string): Observable<{ itemCount: number, body: Account[] }> {
        return this.httpSrv.getData<Account>(ACCOUNT_URL + '/budgets', 0, 100, filter);
    }
}

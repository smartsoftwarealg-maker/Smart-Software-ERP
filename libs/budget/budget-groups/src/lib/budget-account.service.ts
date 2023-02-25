import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {BUDGET_ACCOUNTS, BUDGET_GROUP_URL, BudgetAccount, BudgetGroupTree} from './budget-groups-api';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetAccountService extends BaseEntityService<BudgetAccount> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,BUDGET_ACCOUNTS, BUDGET_GROUP_URL);
    }
}

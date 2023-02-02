import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {BUDGET_GROUP_URL, BudgetGroupTree} from './budget-groups-api';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetGroupsService extends BaseEntityService<BudgetGroupTree>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, BUDGET_GROUP_URL);
    }

    income(): Observable<BudgetGroupTree[]> {
        return this.httpSrv.get<BudgetGroupTree[]>('/budgets/income');
    }

    expense(): Observable<BudgetGroupTree[]> {
        return this.httpSrv.get<BudgetGroupTree[]>('/budgets/expense');
    }
}

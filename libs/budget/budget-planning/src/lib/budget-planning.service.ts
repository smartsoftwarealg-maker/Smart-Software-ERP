import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {BUDGET_PLANNING_URL, BUDGET_URL, BudgetPlanningTree} from './budget-planning-api';

@Injectable({
  providedIn: 'root'
})
export class BudgetPlanningService extends BaseEntityService<BudgetPlanningTree> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, BUDGET_PLANNING_URL, BUDGET_URL);
        super.setParentId(0);
    }

    tree(sign: number): Observable<BudgetPlanningTree[]> {
        return sign == 1? this.income() : this.expense();
    }

    income(): Observable<BudgetPlanningTree[]> {
        return this.httpSrv.get<BudgetPlanningTree[]>(`/budgets/${this.parentId}/income`);
    }

    expense(): Observable<BudgetPlanningTree[]> {
        return this.httpSrv.get<BudgetPlanningTree[]>(`/budgets/${this.parentId}/expense`);
    }
}

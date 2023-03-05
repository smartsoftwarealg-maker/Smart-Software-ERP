import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {
    BUDGET_COMMITMENTS,
    BUDGET_PLANNINGS, BUDGET_TRANSFERS,
    BudgetCommitment,
    BudgetTransfer,
    PlanningInfo
} from './budget-movement-api';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetTransferService extends BaseEntityService<BudgetTransfer> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, BUDGET_TRANSFERS, BUDGET_PLANNINGS);
        this.setParentId(0);
    }

    getInfo(id: number): Observable<PlanningInfo> {
        return this.httpSrv.get<PlanningInfo>(`/budgets/${id}/planning-info`);
    }
}

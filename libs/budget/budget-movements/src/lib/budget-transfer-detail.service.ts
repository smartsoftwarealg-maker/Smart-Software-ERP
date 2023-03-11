import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {
    BUDGET_COMMITMENTS,
    BUDGET_PLANNINGS, BUDGET_TRANSFERS,
    BudgetCommitment,
    BudgetTransfer, BudgetTransferDetail,
    PlanningInfo
} from './budget-movement-api';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Budget} from '@ss/budget/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetTransferDetailService extends BaseEntityService<BudgetTransferDetail> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/detail', '/budgets/transfers');
        this.setParentId(0);
    }
}

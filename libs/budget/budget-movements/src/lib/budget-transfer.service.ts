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
export class BudgetTransferService extends BaseEntityService<BudgetTransfer> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, BUDGET_TRANSFERS, BUDGET_PLANNINGS);
        this.setParentId(0);
    }

    getInfo(id: number): Observable<PlanningInfo> {
        return this.httpSrv.get<PlanningInfo>(`/budgets/${id}/planning-info`);
    }

    getDetailLines(transferId: number): Observable<BudgetTransferDetail[]> {
        return this.httpSrv.get<BudgetTransferDetail[]>(`/budgets/transfers/${transferId}/detail`);
    }

    getDetail(transferId: number, id: number): Observable<BudgetTransferDetail> {
        return this.httpSrv.get<BudgetTransferDetail>(`/budgets/transfers/${transferId}/detail/${id}`);
    }

    getSources(year: number): Observable<Budget[]> {
        const params = new HttpParams().set('year', year);
        return this.httpSrv.get('/budgets/sources', params);
    }
}

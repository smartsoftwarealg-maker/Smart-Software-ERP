import { Injectable } from '@angular/core';
import {ACC_ACC_FILE_URL, CASH_FLOW_ACCOUNTS_URL, CashFlowAcc, PendingTreasury, TreasuryInfo} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CashFlowAccountService extends BaseEntityService<CashFlowAcc> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CASH_FLOW_ACCOUNTS_URL, ACC_ACC_FILE_URL);
    }

    pending(filter: string, consolidated: boolean, sort: string|null): Observable<PendingTreasury[]> {
        const params = new HttpParams()
            .set('filter', filter)
            .set('sort', sort||'accountNo')
            .set('consolidated', consolidated);
        return this.httpSrv.get<PendingTreasury[]>(`/accounting/pending-treasury`, params);
    }

    info(consolidated: boolean): Observable<TreasuryInfo> {
        const params = new HttpParams().set('consolidated', consolidated);
        return this.httpSrv.get<TreasuryInfo>(`/accounting/info-treasury`, params);
    }
}

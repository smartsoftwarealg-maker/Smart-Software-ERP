import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ACC_CTX_URL, ACC_PERIOD_SUMMARY_URL, PeriodSummary} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodSelectorService extends BaseEntityService<PeriodSummary> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_PERIOD_SUMMARY_URL);
    }
    selectFolder(id: number, year: number, period: number): Observable<any> {
        return this.httpSrv.put(ACC_CTX_URL, {fileId:  id, period: period, accYear: year});
    }
}

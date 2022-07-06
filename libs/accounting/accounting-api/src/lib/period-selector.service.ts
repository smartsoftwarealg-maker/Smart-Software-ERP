import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ACC_CTX_URL, ACC_PERIOD_SUMMARY_URL, PeriodSummary, ReopenInfo} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeriodSelectorService extends BaseEntityService<PeriodSummary> {
    private _offset = 0;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_PERIOD_SUMMARY_URL);
    }

    selectFolder(id: number, year: number, period: number): Observable<any> {
        return this.httpSrv.put(ACC_CTX_URL, {fileId:  id, period: period, accYear: year});
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{ itemCount: number; body: PeriodSummary[] }> {
        extraPrams = this._offset ? new HttpParams().set("offset", this._offset) : null;
        return super.getList(page, pageSize, filter, sortBy, extraPrams);
    }

    set offset(value: number) {
        this._offset = value;
    }

    reopen(info: ReopenInfo): Observable<any> {
        return this.httpSrv.post('/accounting/reopen', info);
    }
}

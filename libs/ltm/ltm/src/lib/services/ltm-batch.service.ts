import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { LTM_BATCH_URL, LTMBatch, LTMTesting } from '../ltm-api';
import { dateTimeToYmdStr, dateToYmdStr, HttpService } from '@ss/common/api-common';
import { map, Observable, of, sample } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LtmBatchService extends BaseEntityService<LTMBatch> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_BATCH_URL);
    }

    saveBatch(batch: LTMBatch): Observable<{ count?: number;  id?: number}> {
        return this.httpSrv.put(LTM_BATCH_URL, batch);
    }

    deleteBatch(batch: LTMBatch): Observable<{ count: number }> {
        const params = new HttpParams().set('matter', batch.parentId).set('time', dateTimeToYmdStr(batch.timeStamp));
        return this.httpSrv.removePrams(LTM_BATCH_URL, batch.sampleNo? params.set('sample', batch.sampleNo) : params);
    }

    input0(matterId: number, time: Date, sample?: string): Observable<LTMTesting[]> {
        const params0 = new HttpParams()
            .set('matter', matterId)
            .set('time', dateTimeToYmdStr(time));
        const params = sample? params0.set('sample', sample) : params0;
        return this.httpSrv.get<LTMTesting[]>(LTM_BATCH_URL, params);
    }

    input(id: number): Observable<LTMBatch> {
        const params = new HttpParams().set('id', id);
        return this.httpSrv.get<LTMBatch>(LTM_BATCH_URL, params);
    }

    validateBatch(batch: LTMBatch): Observable<boolean> {
        const time = dateToYmdStr(batch.timeStamp) + ' ' + batch.hour + ':00:00';
        const params = new HttpParams()
            .set('matter', batch.parentId||0)
            .set('time',   time)
            .set('id',     batch.id)
            .set('pickup', batch.pickupPoint || 0);
        return this.httpSrv
            .get<{valid: boolean}>('/ltm/validation', params)
            .pipe(map(res => res.valid));
    }

}

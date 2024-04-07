import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { LTM_BATCH_URL, LTMBatch, LTMTesting } from '../ltm-api';
import { dateTimeToYmdStr, HttpService } from '@ss/common/api-common';
import { Observable, sample } from 'rxjs';
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

    input(matterId: number, time: Date, sample?: string): Observable<LTMBatch> {
        const params0 = new HttpParams()
            .set('matter', matterId)
            .set('time', dateTimeToYmdStr(time));
        const params = sample? params0.set('sample', sample) : params0;
        return this.httpSrv.get<LTMBatch>(LTM_BATCH_URL, params);
    }


}

import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Batch, LTM_BATCH_URL, LTM_TEST_URL, LTMTest} from '../ltm-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LtmBatchService extends BaseEntityService<Batch> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_BATCH_URL);
    }

    saveBatch(batch: Batch): Observable<{ count: number }> {
        return this.httpSrv.post(LTM_BATCH_URL, batch);
    }
}

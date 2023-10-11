import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Batch, LTM_BATCH_URL, LTM_INPUT_URL, LTM_TEST_URL, LTMTest, LTMTesting } from "../ltm-api";
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import { HttpParams } from "@angular/common/http";
import { dateTimeToStr, dateToStr } from "../../../../../../apps/hotel/src/app/common/util";

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

    input(matterId: number, time: Date): Observable<LTMTesting[]> {
        const params = new HttpParams().set('matter', matterId).set('time', dateTimeToStr(time));
        return this.httpSrv.get<LTMTesting[]>(LTM_INPUT_URL, params);
    }
}

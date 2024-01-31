import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Data, LTM_TESTING_URL, LTM_TEST_URL, LTM_TESTINGS_URL, LTMTesting} from '../ltm-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import { DateUtil } from "@ss/costing/costing-utils";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LtmTestingService extends BaseEntityService<LTMTesting> {
    private datePipe = new DatePipe('en');

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_TESTING_URL);
    }

    getData(matterId: number, period: string, anomaly: boolean, from: Date, to: Date): Observable<Data[]> {
        const params = new HttpParams()
            .set('matter', matterId)
            .set('anomaly', anomaly)
            .set('from', this.datePipe.transform(from.toString(), 'dd/MM/yyyy'))
            .set('to', this.datePipe.transform(to.toString(), 'dd/MM/yyyy'));
        return this.httpSrv.get<Data[]>('/ltm/data/' + period, params);
    }

    export(from: Date, to: Date): Observable<Blob> {
        const params = new HttpParams()
            .set('from', DateUtil.dateToStr(new Date(from)))
            .set('to', DateUtil.dateToStr(new Date(to)));
        return this.httpSrv.getBlob('/ltm/excel', params);
    }
}



import {BaseEntityService} from '@ss/common/api-base-entity';
import { Data, LTMTesting } from '../ltm-api';
import { dateTimeToStr, HttpService } from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import { DateUtil } from '@ss/costing/costing-utils';

export class LtmBaseTestingClass extends BaseEntityService<LTMTesting> {
    #_from = new Date();
    #_to   = new Date();

    constructor(protected override httpSrv: HttpService, public override url: string, public override parentUrl: string) {
        super(httpSrv, url, parentUrl);
    }

    getData(matterId: number, period: string, anomaly: boolean, from: Date, to: Date): Observable<Data[]> {
        const params = new HttpParams()
            .set('matter', matterId)
            .set('anomaly', anomaly)
            .set('from', dateTimeToStr(from))
            .set('to', dateTimeToStr(to));
        return this.httpSrv.get<Data[]>('/ltm/data/' + period, params);
    }

    export(from: Date, to: Date, periodicity: number): Observable<Blob> {
        const fromDate = periodicity === 1? DateUtil.dateTimeToStr(new Date(from)) : DateUtil.dateToStr(new Date(from));
        const toDate = periodicity === 1? DateUtil.dateTimeToStr(new Date(to)) : DateUtil.dateToStr(new Date(to));
        const params = new HttpParams()
            .set('periodicity', periodicity)
            .set('from', fromDate)
            .set('to', toDate);
        return this.httpSrv.getBlob('/ltm/excel', params);
    }

    deleteAll(ids: number[]): Observable<{ count: number }> {
        return this.httpSrv.remove('/ltm/testings', ids);
    }

    get from() {
        return this.#_from;
    }
    get to() {
        return this.#_to;
    }

    set from(d: Date) {
        this.#_from = d || new Date();
    }

    set to(d: Date) {
        this.#_to = d || new Date();
    }
}



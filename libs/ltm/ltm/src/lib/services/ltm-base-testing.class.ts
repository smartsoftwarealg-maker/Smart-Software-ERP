import { inject, Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Data, LTM_TESTING_URL, LTMTesting, LTM_MATTER_URL } from '../ltm-api';
import { dateTimeToStr, HttpService } from "@ss/common/api-common";
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import { DateUtil } from "@ss/costing/costing-utils";
import { Router, UrlTree } from '@angular/router';

export class LtmBaseTestingClass extends BaseEntityService<LTMTesting> {
    private router = inject(Router);

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

    canActivate():
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.getParentId()? true : this.router.createUrlTree(['/app/ltm/ltm-testings']);
    }
}



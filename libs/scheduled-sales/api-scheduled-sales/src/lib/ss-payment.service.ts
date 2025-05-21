import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Joint, Payment, SS_PAYMENTS } from './scheduled-sales-api';
import { dateTimeToStr, HttpService, PaginationModel } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SSPaymentService extends BaseEntityService<Payment>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SS_PAYMENTS);
    }
    //
    // join(joint: Joint): Observable<{ id: number}> {
    //     return this.httpSrv.post(`/ssales/debts/join`, joint);
    // }
    //
    // free(joint: Joint): Observable<{ id: number}> {
    //     return this.httpSrv.remove(`/ssales/debts/free`, joint);
    // }

    getPeriodicPage(pageModel: PaginationModel, from: Date, to: Date, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<Payment[]> {
        if (!from || !to) {
            return of([]);
        }
        const params = (extraPrams||new HttpParams()).set('from', dateTimeToStr(from)).set('to', dateTimeToStr(to));
        return super.getPage(pageModel, filter, sortBy, params);
    }
}

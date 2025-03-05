import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Joint, Payment, SS_PAYMENTS } from './scheduled-sales-api';
import {HttpService} from '@ss/common/api-common';
import { Observable } from 'rxjs';

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
}

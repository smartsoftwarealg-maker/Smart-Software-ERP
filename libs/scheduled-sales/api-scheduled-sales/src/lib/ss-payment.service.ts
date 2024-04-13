import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Payment, SS_PAYMENTS } from './scheduled-sales-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class SSPaymentService extends BaseEntityService<Payment>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SS_PAYMENTS);
    }
}

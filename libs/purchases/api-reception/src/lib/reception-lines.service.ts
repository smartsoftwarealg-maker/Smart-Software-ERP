import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {PURCHASE_DETAIL, PURCHASE_URL} from './reception-api';
import {TransactionLine} from '@ss/logistics/api-transaction';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';

@Injectable({
  providedIn: 'root'
})
export class ReceptionLinesService extends BaseEntityExtendedService<TransactionLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv,  PURCHASE_DETAIL, PURCHASE_URL);
    }
}

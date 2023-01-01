import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Transaction} from '@ss/logistics/api-transaction';
import {HttpService} from '@ss/common/api-common';
import {PURCHASE_CANCELLATION_URL} from '../../../api-reception/src/lib/reception-api';

@Injectable({
  providedIn: 'root'
})
export class ReceptionCancellationService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PURCHASE_CANCELLATION_URL);
    }
}

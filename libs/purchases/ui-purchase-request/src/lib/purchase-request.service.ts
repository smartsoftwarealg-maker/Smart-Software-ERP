import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Transaction} from '@ss/logistics/api-transaction';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, "/purchase-request");
    }
}

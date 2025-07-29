import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {
    INTER_STORE_TRANSFER_URL,
    InterStoreTransfer,
    InterStoreTransferLine,
    Transaction,
    TransactionLinesClass
} from '@ss/logistics/api-transaction';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class InterStoreTransferService extends BaseEntityService<InterStoreTransfer>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,INTER_STORE_TRANSFER_URL );
    }
}

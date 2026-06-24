import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { TRANSACTION_TYPE_URL, TransactionType } from './transaction-types.api';

@Injectable({
    providedIn: 'root',
})
export class TransactionTypesService extends BaseEntityService<TransactionType> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TRANSACTION_TYPE_URL);
    }
}

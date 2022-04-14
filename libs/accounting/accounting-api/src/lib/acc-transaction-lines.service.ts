import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ACC_DETAIL_URL,
    ACC_TRANSACTION_URL, ACC_TRANSACTIONS_URL,
    ACCTransaction, ACCTransactionLine
} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccTransactionLineService extends BaseEntityService<ACCTransactionLine> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_DETAIL_URL, ACC_TRANSACTIONS_URL);
    }
}

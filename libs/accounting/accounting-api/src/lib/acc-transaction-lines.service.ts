import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ACC_DETAIL_URL,
    ACC_TRANSACTIONS_URL,
    ACCTransactionLine
} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AccTransactionLineService extends BaseEntityService<ACCTransactionLine> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_DETAIL_URL, ACC_TRANSACTIONS_URL);
    }
}

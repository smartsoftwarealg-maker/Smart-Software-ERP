import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ACC_TRANSACTION_URL,
    ACCTransaction
} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AccTransactionService extends BaseEntityService<ACCTransaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_TRANSACTION_URL);
    }

    findByJournal(journalId: number, page: number, pageSize: number): Observable<{ body: ACCTransaction[], itemCount: number }> {
        const params = new HttpParams().set("journal", journalId);
        return this.getList(page - 1, pageSize, null, null, params);
    }
}

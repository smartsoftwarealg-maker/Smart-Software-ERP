import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Observable, of} from 'rxjs';
import {TransactionLine} from './transaction-line';
import {Transaction} from './transaction';

@Injectable({
    providedIn: 'root'
})
export class TransactionLinesService extends BaseEntityExtendedService<TransactionLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv,  '/detail', '/transactions');
    }

    getTransaction(id: number): Observable<Transaction> {
        return this.httpSrv.get(`/inventory/${id}`);
    }
}

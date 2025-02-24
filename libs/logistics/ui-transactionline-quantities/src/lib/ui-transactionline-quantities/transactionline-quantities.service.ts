import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { Quantities } from './transactionie-quantities-api';

@Injectable( {
    providedIn: 'root'
})
export class TransactionlineQuantitiesService extends BaseEntityService<Quantities> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, 'quantities', 'transactions');
    }

    getData(): Observable<Quantities[]> {
        return this.httpSrv
            .get<Quantities[]>(`/transactions/${this.getParentId()}/quantities`);
    }
}

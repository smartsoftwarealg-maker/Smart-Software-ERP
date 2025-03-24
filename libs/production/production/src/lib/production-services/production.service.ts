import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { PRODUCTION_URL } from './production-api';
import {Transaction} from '@ss/logistics/api-transaction';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductionService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PRODUCTION_URL);
    }

    consumeContract(id: number): Observable<any> {
        return this.httpSrv.post(`/contracts/${id}/get-articles`);
    }
}

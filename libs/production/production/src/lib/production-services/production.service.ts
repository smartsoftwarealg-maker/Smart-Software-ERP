import { Injectable, inject } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { PRODUCTION_URL } from './production-api';
import {Transaction} from '@ss/logistics/api-transaction';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductionService extends BaseEntityService<Transaction> {

    protected override httpSrv = inject(HttpService);

    constructor() {
        super(inject(HttpService), PRODUCTION_URL);
    }

    produceAll(id: number): Observable<{ count: number }> {
        return this.httpSrv.post(`/production/mrp/produce-all/${id}`);
    }

    cancelAll(id: number): Observable<{ count: number }> {
        return this.httpSrv.post(`/production/mrp/cancel-all/${id}`);
    }

    produce(id: number): Observable<{ count: number }> {
        return this.httpSrv.post(`/production/mrp/produce/${id}`);
    }

    cancel(id: number): Observable<{ count: number }> {
        return this.httpSrv.post(`/production/mrp/cancel/${id}`);
    }
}

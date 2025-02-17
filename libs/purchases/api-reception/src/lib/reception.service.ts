import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {PURCHASE_URL} from './reception-api';
import {Transaction} from '@ss/logistics/api-transaction';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReceptionService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PURCHASE_URL);
    }

    consumeContract(id: number): Observable<any> {
        return this.httpSrv.post(`/contracts/${id}/get-articles`);
    }
}

import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {DELIVERY_URL} from './delivery-api';
import { Transaction, TransactionLine } from '@ss/logistics/api-transaction';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class DeliveryService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DELIVERY_URL);
    }

    consumeContract(id: number): Observable<any> {
        return this.httpSrv.post(`/projects/${id}/get-articles`);
    }

}

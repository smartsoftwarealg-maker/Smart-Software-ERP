import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {
    FURNITURE_TRANSACTIONS,
    FURNITURE_RECEIVER,
    FURNITURE_RECEPTIONS,
    FurnitureReceiver,
    FurnitureTransaction, FurnitureTransactionDetail
} from './furniture-api';
import {DETAIL_URL} from '@ss/treasury/api-transactions';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FurnitureTransactionLineService extends BaseEntityService<FurnitureTransactionDetail> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DETAIL_URL, FURNITURE_TRANSACTIONS);
    }

    getDetailLines(id: number): Observable<FurnitureTransactionDetail[]> {
        return this.httpSrv.get<FurnitureTransactionDetail[]>(`/furniture/transactions/${id}/detail`);
    }
}

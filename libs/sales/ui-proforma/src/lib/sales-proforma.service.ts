import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Transaction} from '@ss/logistics/api-transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesProformaService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/proforma');
    }

    consumeContract(id: number): Observable<any> {
        return this.httpSrv.post(`/projects/${id}/get-articles`);
    }
}

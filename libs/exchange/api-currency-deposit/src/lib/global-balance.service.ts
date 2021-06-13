import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {EXCHANGE_GBALANCE_URL, GBalance} from "./models";


@Injectable({
    providedIn: 'root'
})
export class GlobalBalanceService extends BaseEntityExtendedService<GBalance> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, EXCHANGE_GBALANCE_URL);
    }

    getGBalance(page: number, limit: number): Observable<GBalance[]> {
        const url = `/exchanges/gbalance?id=0&page=${page}-${limit}`;
        return this.httpSrv.get<GBalance[]>(url);
    }
}

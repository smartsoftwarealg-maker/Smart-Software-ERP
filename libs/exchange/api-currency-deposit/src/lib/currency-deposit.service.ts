import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {GBalance, Balance, CBalance, Commission, Deposit, EXCHANGE_DEPOSIT_URL} from "./models";


@Injectable({
  providedIn: 'root'
})
export class CurrencyDepositService extends BaseEntityExtendedService<Deposit> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, EXCHANGE_DEPOSIT_URL);
    }

    getHistory(id: number, page: number, limit: number): Observable<{ itemCount: number, body: History[] }> {
        const url = `/exchanges/history?id=${id}&page=${page}-${limit}`;
        return this.httpSrv.getData<History>(url, page, limit);
    }

    getCommissions(id: number, page: number, limit: number): Observable<Commission[]> {
        const url = `/exchanges/commissions?id=${id}&page=${page}-${limit}`;
        return this.httpSrv.get<Commission[]>(url);
    }

    getBalance(id: number, page: number, limit: number): Observable<Balance[]> {
        const url = `/exchanges/balance?id=${id}&page=${page}-${limit}`;
        return this.httpSrv.get<Balance[]>(url);
    }

    getCBalance(id: number, page: number, limit: number): Observable<CBalance[]> {
        const url = `/exchanges/cbalance?id=${id}`;
        return this.httpSrv.get<CBalance[]>(url);
    }

    getGBalance(page: number, limit: number): Observable<GBalance[]> {
        const url = `/exchanges/gbalance?id=0&page=${page}-${limit}`;
        return this.httpSrv.get<GBalance[]>(url);
    }
}

import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

export const EXCHANGE_DEPOSIT_URL = '/deposits';

export interface Deposit {
    id: number;
    customerId: number;
    excDate: Date;
    depositType: number;
    description?: string;
    currencyId: number;
    amount: number;
    userId: number;
    centerId: number;
    soldCurrencyId?: number;
    exchangeRate?:number;
    creationTime: string;
    denomination?: string;
    commission?: number;
    typeDescription?: string;
    currencyDescription?: string;
}

export interface History {
    excDate: Date;
    customer?: string;
    excType?: string;
    description?: string;
    currency?: string;
    debit: number;
    credit: number
    creationDate?: string;
}

export interface Commission {
    description: string;
    withdrawal: number;
    commission: number;
    rate: number;
}

export interface Balance {
    currency: string;
    debit:    number;
    credit:   number;
}

export interface CBalance {
    currency: string;
    amount:    number;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyDepositService extends BaseEntityExtendedService<Deposit> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, EXCHANGE_DEPOSIT_URL);
    }

    getHistory(id: number, page: number, limit: number): Observable<History[]> {
        const url = `/exchanges/history?id=${id}&page=${page}-${limit}`;
        return this.httpSrv.get<History[]>(url);
    }

    getCommissions(id: number, page: number, limit: number): Observable<History[]> {
        const url = `/exchanges/commissions?id=${id}&page=${page}-${limit}`;
        return this.httpSrv.get<History[]>(url);
    }

    getBalance(id: number, page: number, limit: number): Observable<Balance[]> {
        const url = `/exchanges/balance?id=${id}&page=${page}-${limit}`;
        return this.httpSrv.get<Balance[]>(url);
    }

    getCBalance(id: number, page: number, limit: number): Observable<CBalance[]> {
        const url = `/exchanges/cbalance?id=${id}`;
        return this.httpSrv.get<CBalance[]>(url);
    }
}

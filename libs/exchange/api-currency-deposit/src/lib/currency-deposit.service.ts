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
    creationTime: string;
    denomination?: string;
    typeDescription?: string;
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

export interface Balance {
    currency: string;
    debit:    number;
    credit:   number;
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

    getBalance(id: number, page: number, limit: number): Observable<Balance[]> {
        const url = `/exchanges/balance?id=${id}&page=${page}-${limit}`;
        return this.httpSrv.get<Balance[]>(url);
    }
}

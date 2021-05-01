import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

export const EXCHANGE_EXCHANGE_URL = '/exchanges';

export interface Exchange {
    id: number;
    centerId: number;
    depositId?: number;
    agentId: number;
    exchDate: string;
    purchCurrency: number;
    amount: number;
    soldCurrency: number;
    exchRate: number;
    memo: string;
    userId: number;
    creation_time: string;
    denomination?: string;
    purchCurrDescrip?: string;
    soldCurrDescrip?: string;
}


@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService extends BaseEntityExtendedService<Exchange> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, EXCHANGE_EXCHANGE_URL);
    }
}

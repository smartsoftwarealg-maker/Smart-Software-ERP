import { Injectable } from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';

export const EXCHANGE_EXCHANGE_URL = '/exchanges';

export interface Exchange {
    id: number;
    customerId: number;
    excDate: Date;
    depositType: number;
    description?: string;
    currencyId: number;
    amount: number;
    creationTime: string;
    denomination?: string;
    typeDescription?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService extends BaseEntityExtendedService<Exchange> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, EXCHANGE_EXCHANGE_URL);
    }
}

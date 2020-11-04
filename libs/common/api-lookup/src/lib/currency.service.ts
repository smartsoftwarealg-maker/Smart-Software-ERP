import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Currency, CURRENCY_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService extends BaseEntityService<Currency> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CURRENCY_URL);
    }

}

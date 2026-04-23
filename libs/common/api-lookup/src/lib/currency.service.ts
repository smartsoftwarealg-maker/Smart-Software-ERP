import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Currency, CURRENCY_URL} from './lookups-api';
//import {BaseEntityService} from '@ss/common/api-base-entity';
import {shareReplay, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService extends BaseEntityService<Currency> {
    private currencies: Currency[] = [];

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CURRENCY_URL);
    }

    get currencyList(): Currency[] {
        return this.currencies;
    }

    load(): Observable<Currency[]> {
        return this.httpSrv
            .get<Currency[]>(CURRENCY_URL)
            .pipe(tap((res: Currency[]) => this.currencies = res),
                shareReplay());
    }
}

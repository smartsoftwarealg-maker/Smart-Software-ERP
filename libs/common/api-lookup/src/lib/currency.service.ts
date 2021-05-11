import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Currency, CURRENCY_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService extends BaseEntityService<Currency> {
    private _currencyList: Currency[] = [];

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CURRENCY_URL);
    }

    get currencyList(): Currency[] {
        return this._currencyList;
    }

    load(): Observable<Currency[]> {
        return (this._currencyList.length === 0)?
            this.httpSrv
                .get<Currency[]>(CURRENCY_URL)
                .pipe(tap(res => this._currencyList = res)) :
            of(this._currencyList);
    }
}

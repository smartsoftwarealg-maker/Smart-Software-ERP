import {Injectable} from '@angular/core';
import {dateToDmyStr, HttpService, isString} from '@ss/common/api-common';
import {ERR, Option} from './option.class';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {from, Observable} from 'rxjs';

export const OPTION_URL = '/logistics/options';

@Injectable({
    providedIn: 'root'
})

export class OptionService extends BaseEntityExtendedService<Option> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, OPTION_URL);
    }

    recalculatePrice(since: Date): Observable<ERR[]> {
        const date = isString(since)? since : dateToDmyStr(since);
        return this.httpSrv.put(`/recalculate?date=${date}`);
    }

    // recalculatePriceFetch(since: Date): Observable<ERR[]> {
    //     const date = isString(since)? since : dateToDmyStr(since);
    //     const base = this.httpSrv.getBaseUrl();
    //     const promise = fetch(`${base}/recalculate?date=${date}`, {
    //         method: 'PUT',
    //         headers: {'Authorization': this.httpSrv.getAuthToken() }
    //     }).then(res => res.json());
    //     return from(promise);
    // }

}


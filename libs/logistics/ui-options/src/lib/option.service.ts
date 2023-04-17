import {Injectable} from "@angular/core";
import {dateToDmyStr, HttpService, isString, LanguageService} from "@ss/common/api-common";
import {ERR, MiniLine, Option} from "./option.class";
import {BaseEntityExtendedService} from "@ss/common/api-base-entity";
import {from, Observable} from 'rxjs';
import {DatePipe} from '@angular/common';

export const OPTION_URL = '/logistics/options';

@Injectable({
    providedIn: 'root'
})

export class OptionService extends BaseEntityExtendedService<Option> {
    private datePipe: DatePipe = new DatePipe(this.langSrv.defaultLanguage);
    constructor(protected override httpSrv: HttpService, private langSrv: LanguageService) {
        super(httpSrv, OPTION_URL);
    }

    recalculatePrice(since: Date): Observable<ERR[]> {
        const date = isString(since)? since : dateToDmyStr(since);
        return this.httpSrv.put(`/reception/recalculate?date=${date}`);
    }

    recalculatePriceFetch(since: Date): Observable<ERR[]> {
        const date = isString(since)? since : dateToDmyStr(since);
        const base = this.httpSrv.getBaseUrl();
        const promise = fetch(`${base}/reception/recalculate?date=${date}`, {
            method: 'PUT',
            headers: {'Authorization': this.httpSrv.getAuthToken() }
        }).then(res => res.json());
        return from(promise);
    }

}


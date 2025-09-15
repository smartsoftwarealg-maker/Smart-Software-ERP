import {Injectable} from '@angular/core';
import {dateToDmyStr, HttpService, isString} from '@ss/common/api-common';
import {ERR, Option} from './option.class';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';
import { HttpResponse} from '@angular/common/http';

export const OPTION_URL = '/logistics/options';

@Injectable({
    providedIn: 'root'
})

export class OptionService extends BaseEntityExtendedService<Option> {
    #_options: Option|null = null;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, OPTION_URL);
    }

    recalculatePrice(since: Date, receptions?: string): Observable<ERR[]> {
        const date = isString(since)? since : dateToDmyStr(since);
        const receptionParam = receptions ? `&receptions=${receptions}` : '';
        return this.httpSrv.put(`/recalculate?date=${date}${receptionParam}`);
    }
    recalculatePrice2(since: Date, receptions?: string): Observable<string> {
        const date = isString(since)? since : dateToDmyStr(since);
        const receptionParam = receptions ? `&receptions=${receptions}` : '';
        return this.httpSrv.put(`/recalculate?date=${date}${receptionParam}`);
    }

    recalculateDocument(since: Date, document: number): Observable<ERR[]> {
        const date = isString(since)? since : dateToDmyStr(since);
        return this.httpSrv.put(`/recalculate-documents?date=${date}&document=${document}`);
    }
    recalculateDocument2(since: Date, document: number): Observable<string> {
        const date = isString(since)? since : dateToDmyStr(since);
        return this.httpSrv.put(`/recalculate-documents?date=${date}&document=${document}`);
    }

    getStatus(uuid: string): Observable<HttpResponse<Object>> {
        return this.httpSrv.getFullResponse(`/recalculate-documents?uuid=${uuid}`);
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

    get options(): Option|null {
        return this.#_options;
    }

    set options(o: Option) {
        this.#_options = o;
    }
}


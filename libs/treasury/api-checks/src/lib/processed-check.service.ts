import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {
    Check,
    CHECKS_URL,
    Match,
    MATCHED_CHECKS_URL,
    MATCHED_NON_CHECKS_URL,
    PROCESSED_CHECKS_URL,
    ProcessedCheck
} from './treasury-api';
import {Observable} from 'rxjs';
import {MatCheckbox} from '@angular/material/checkbox';
import {HttpParams} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ProcessedCheckService extends BaseEntityExtendedService<ProcessedCheck> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PROCESSED_CHECKS_URL);
    }

    upload(data: FormData): Observable<any> {
        return this.httpSrv.upload(PROCESSED_CHECKS_URL + '/injection', data);
    }

    private getParams(bankId: number, filter?: string) {
        const params = new HttpParams().set('bank', bankId);
        return filter? params.set('filter', filter) : params;
    }

    matched(bankId: number, page: number, size: number, filter?: string): Observable<{ body: Match[], itemCount: number }> {
        return this.httpSrv.getData(MATCHED_CHECKS_URL, page - 1, size, filter, null, this.getParams(bankId, filter));
    }

    nonMatched(bankId: number, page: number, size: number, filter?: string): Observable<{ body: Match[], itemCount: number }> {
        return this.httpSrv.getData(MATCHED_NON_CHECKS_URL, page - 1, size, filter, null, this.getParams(bankId, filter))
    }
}

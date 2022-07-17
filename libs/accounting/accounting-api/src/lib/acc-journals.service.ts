import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ACC_JOURNALS_URL, ACC_USER_JOURNALS_URL, Journal} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccJournalsService extends BaseEntityService<Journal> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_JOURNALS_URL);
    }

    getUserJournals(filter: string): Observable<{ itemCount: number; body: Journal[] }> {
        const params = new HttpParams().set("filter", filter);
        return this.httpSrv.getData<Journal>(ACC_USER_JOURNALS_URL, 0, 100, filter, null, params);
    }
}

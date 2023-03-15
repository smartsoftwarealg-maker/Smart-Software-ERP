import { Injectable } from '@angular/core';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import {JOURNALS_URL, Journal, USER_JOURNALS_URL} from './model';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UserJournalsService extends BaseEntityExtendedService<Journal> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, USER_JOURNALS_URL);
    }


    override get(iid: number | string): Observable<Journal> {
        return this.httpSrv.get(`/treasury/journals/${iid}`)
    }
}

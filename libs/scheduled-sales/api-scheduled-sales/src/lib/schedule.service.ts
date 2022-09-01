import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    Article,
    Quota,
    Schedule,
    SS_ARTICLE_URL,
    SS_QUOTA_URL,
    SS_SCHEDULE_AGENTS,
    SS_SCHEDULE_URL
} from './scheduled-sales-api';
import {HttpService} from '@ss/common/api-common';
import {ARTICLE_IMAGE_URL, ARTICLES_URL} from '@ss/stock/api-article';
import {map, Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends BaseEntityService<Schedule>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SS_SCHEDULE_URL, SS_SCHEDULE_AGENTS);
        this.setParentId(0);
    }

    getQuotas(agentId: number, mode: number = 1): Observable<Quota[]> {
        const params = new HttpParams()
            .set('agent', '' + agentId)
            .set('mode', '' + mode);
        return  this.httpSrv
            .getData<Quota>(SS_QUOTA_URL, 0, 50, null, null, params)
            .pipe(map(res => res.body));
    }

    getBalance(agentId: number, schedId: number): Observable<number> {
        return null; // this.httpSrv.getData<{ balance: number }>('', 0, 50, null, null, params);
    }
}

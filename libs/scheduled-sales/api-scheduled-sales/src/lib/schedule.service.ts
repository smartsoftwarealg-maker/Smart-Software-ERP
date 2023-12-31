import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    Article, Qty,
    Quota,
    Schedule,
    SS_ARTICLE_URL,
    SS_QUOTA_URL,
    SS_SCHEDULE_AGENTS,
    SS_SCHEDULE_URL
} from './scheduled-sales-api';
import {HttpService, LanguageService} from '@ss/common/api-common';
import {ARTICLE_IMAGE_URL, ARTICLES_URL} from '@ss/master-data/api-article';
import {map, Observable, tap} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends BaseEntityService<Schedule>{

    constructor(protected override httpSrv: HttpService, private langSrv: LanguageService) {
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
        const params = new HttpParams()
            .set('agent', '' + agentId)
            .set('schedule', '' + schedId);
        return this.httpSrv
            .get<{ balance: number }>('/ssales/balance', params)
            .pipe(map(res => res.balance || 0));
    }

    getQuantities(reference: string): Observable<Qty[]> {
        const params = new HttpParams().set('reference', reference);
        return this.httpSrv
            .getData<Qty>('/ssales/quantities', 0, 50, null, null, params)
            .pipe(map(res => res.body));
    }

    getRemainingQty(agentId: number, scheduleId: number, reference: string, date: Date): Observable<number> {
        const params = new HttpParams()
            .set('agent', agentId + '')
            .set('schedule', scheduleId + '')
            .set('reference', reference)
            .set('date', this.langSrv.formatDate(date));
        return this.httpSrv
            .get<{ qty: number }>('/ssales/remaining-qty', params)
            .pipe(map(res => res.qty || 0));
    }

    schedule(schedule: Schedule): Observable<any> {
        return schedule.id?
            this.httpSrv.put('/ssales/schedule', schedule) :
            this.httpSrv.post('/ssales/schedule', schedule) ;
    }
}

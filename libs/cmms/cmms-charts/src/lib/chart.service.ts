import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from '@ss/common/api-lookup';
import { dateToYmdStr, HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import {ByPriority, Gantt, Mttr, Mtts, PastDue, PendingSR, Pmp} from './chart-api';

@Injectable({
    providedIn: 'root'
})
export class ChartService extends BaseEntityService<Lookup>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, null);
    }

    pending(): Observable<PendingSR> {
        return this.httpSrv.get<PendingSR>('/cmms/pending');
    }

    pastDue(): Observable<PastDue> {
        return this.httpSrv.get<PastDue>('/cmms/past-due');
    }

    assetsPriority(): Observable<ByPriority[]> {
        return this.httpSrv.get<ByPriority[]>('/cmms/assets-priority');
    }

    srPriority(): Observable<ByPriority[]> {
        return this.httpSrv.get<ByPriority[]>('/cmms/sr-priority');
    }

    woPriority(): Observable<ByPriority[]> {
        return this.httpSrv.get<ByPriority[]>('/cmms/wo-priority');
    }

    gantt(date: Date): Observable<Gantt[]> {
        const from = dateToYmdStr(date);
        return this.httpSrv.get<Gantt[]>('/cmms/gantt?from=' + from);
    }

    mttr(date: Date): Observable<Mttr> {
        const from = dateToYmdStr(date);
        return this.httpSrv.get<Mttr>('/cmms/mttr?from=' + from);
    }

    mtts(date: Date): Observable<Mtts> {
        const from = dateToYmdStr(date);
        return this.httpSrv.get<Mtts>('/cmms/mtts?from=' + from);
    }

    pmp(date: Date): Observable<Pmp> {
        const from = dateToYmdStr(date);
        return this.httpSrv.get<Pmp>('/cmms/pmp?from=' + from);
    }
}

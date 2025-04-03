import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ATT_ATTENDANCE,
    ATTENDANCE_PERSONS_URL,
    ATTENDANCE_SHIFTS_URL,
    ATTReport,
    PersonShift,
    WORK_SHIFT_URL,
    WorkShift
} from './attendance-api';
import {HttpService, LanguageService} from '@ss/common/api-common';
import {map, Observable, of} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceLogService extends BaseEntityService<ATTReport> {
    private urlMap = new Map<number, string>([
        [1, '/attendance/signatures'],
        [2, '/attendance/presences'],
        [3, '/attendance/absences'],
        [4, '/attendance/lateness'],
        [5, '/attendance/shifts-log'],
    ]);
    constructor(protected override httpSrv: HttpService, private langSrv: LanguageService) {
        super(httpSrv, ATT_ATTENDANCE);
    }

    getReport(log: number, id: number, from: Date, to: Date, ipList: string|null): Observable<ATTReport[]> {
        const params = new HttpParams()
            .set('id', id)
            .set('from', this.langSrv.formatDate(from))
            .set('to', this.langSrv.formatDate(to));
        const params2 = ipList? params.set("ip", ipList) : params;
        const url = this.urlMap.get(log);
        return url ?
            this.httpSrv
                .getData<ATTReport>(url, 0, 1000, null, null, params2)
                .pipe(map(res => res.body)) :
            of([]);
    }


    upload(log: number, data: FormData): Observable<any> {
        const url = this.urlMap.get(log);
        return this.httpSrv.upload(url, data);
    }

    saveFromMachines(id: number, from: Date, to: Date, ipList: string|null): Observable<ATTReport[]> {
        const params = new HttpParams()
            .set('id', id)
            .set('from', this.langSrv.formatDate(from))
            .set('to', this.langSrv.formatDate(to));
        const params2 = ipList? params.set('ip', ipList) : params;
        return this.httpSrv.post('/attendance/save-ip', params2);
    }

    saveFromText(data: FormData): Observable<{  count: number }> {
        return this.httpSrv.upload('/attendance/save-log', data);
    }

}

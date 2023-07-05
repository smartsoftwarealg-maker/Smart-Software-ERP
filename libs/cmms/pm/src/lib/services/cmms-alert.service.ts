import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_ALERT_URL, PM } from '../../../../cmms-api/cmms-api';
import { dateToDmyStr, HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CMMSAlertService extends BaseEntityService<PM> {
    private _date : Date = new Date();

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_ALERT_URL);
    }

    generate(date: Date, filter?: string): Observable<{ count: number }> {
        return this.httpSrv.post(CMMS_ALERT_URL, { date: date, filter: filter});
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{
        itemCount: number;
        body: PM[]
    }> {
        return super.getList(page, pageSize, filter, sortBy, new HttpParams().set('date', dateToDmyStr(this._date)));
    }

    set date(d: Date) {
        this._date = d || this._date;
    }
}

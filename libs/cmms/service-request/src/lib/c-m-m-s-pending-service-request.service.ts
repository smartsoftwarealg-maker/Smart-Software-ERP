import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_PENDING_SERVICE_REQUEST_URL, Work } from '@ss/cmms/cmms-api';
import { dateToYmdStr, HttpService, PaginationModel } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CMMSPendingServiceRequestService extends BaseEntityService<Work> {
    private _date = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    private _filter: string | null = null;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_PENDING_SERVICE_REQUEST_URL);
    }

    override getPage(pageModel: PaginationModel, filter?: string, sortBy?: string): Observable<Work[]> {
        const dateParam = new HttpParams().set('date', dateToYmdStr(this._date));
        const params = this._filter === null? dateParam : dateParam.set('filter', this._filter)
        return super.getPage(pageModel, filter, sortBy, params);
    }

    set filter(f: string) {
        this._filter = f || null;
    }

    set date(d: Date) {
        this._date = d;
    }

    generate(id: number): Observable<any> {
        return this.httpSrv.post(CMMS_PENDING_SERVICE_REQUEST_URL + '/' + id);
    }
}

import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    HOLIDAY_REQUEST_URL
} from './attendance-api';
import {HttpService} from '@ss/common/api-common';
import {HolidayRequest} from '@ss/payroll/api-employee';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HolidayRequestService extends BaseEntityService<HolidayRequest> {
    private _absenceMotive = 0;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, HOLIDAY_REQUEST_URL);
    }

    set absenceMotive(m: number) {
        this._absenceMotive = m;
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{
        itemCount: number;
        body: HolidayRequest[]
    }> {
        const params = (extraPrams || new HttpParams()).set('parentid', this._absenceMotive);
        return super.getList(page, pageSize, filter, sortBy, params);
    }
}

import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ATTSignature, Holiday, HOLIDAY_URL, SIGNATURE_URL, WORK_SHIFT_URL, WorkShift} from './attendance-api';
import { dateToYmdStr, HttpService } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignatureService extends BaseEntityService<ATTSignature> {
    #_date = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SIGNATURE_URL);
    }

    set date(d: Date) {
        this.#_date = d
    }

    get date() {
        return this.#_date
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{
        itemCount: number;
        body: ATTSignature[]
    }> {
        const search = (filter || '') + '//' + dateToYmdStr(this.#_date);
        return super.getList(page, pageSize, search, sortBy, extraPrams);
    }
}

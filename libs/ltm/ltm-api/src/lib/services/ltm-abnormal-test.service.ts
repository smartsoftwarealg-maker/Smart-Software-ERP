import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { LTM_ABNORMAL_TESTS_URL, LTMAbnormalTest, LTMTestingAnomaly } from '../ltm-api';
import { dateToYmdStr, HttpService } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LtmAbnormalTestService extends BaseEntityService<LTMAbnormalTest> {
    #_from: Date = new Date(new Date().getTime() - 24 * 3600 * 1000 * 30 );
    #_to: Date = new Date();

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_ABNORMAL_TESTS_URL);
    }

    refresh(from: Date, to: Date, open: boolean, page: number, pageSize: number, filter?: string): Observable<{body: LTMAbnormalTest[], itemCount: number}> {
        const params = new HttpParams()
            .set('from', dateToYmdStr(from))
            .set('to', dateToYmdStr(to))
            .set('open', open)
            .set('page', `${page}-${pageSize}`);
        const params2 = filter? params.set('filter', filter || '') :  params;
        const params3 = this.sortColumn? params2.set('sort', this.sortColumn) : params2;
        return super.getList(page, pageSize, filter, this.sortColumn, params3);
    }

    get from(): Date {
        return this.#_from;
    }

    set from(value: Date) {
        this.#_from = value;
    }

    get to(): Date {
        return this.#_to;
    }

    set to(value: Date) {
        this.#_to = value;
    }
}

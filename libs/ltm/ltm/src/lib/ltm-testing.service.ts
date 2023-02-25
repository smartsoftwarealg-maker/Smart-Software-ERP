import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {LTM_LTM_LINE_URL, LTM_TEST_URL, LTM_TESTINGS_URL, LTMTesting} from './ltm-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {DatePipe} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class LtmTestingService extends BaseEntityService<LTMTesting> {
    private datePipe = new DatePipe('en');

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/tests', LTM_LTM_LINE_URL);
        super.setParentId(0);
    }

    getData(lineId: number, matterId: number, from: Date, to: Date): Observable<LTMTesting[]> {
        const params = new HttpParams()
            .set('line', lineId)
            .set('matter', matterId)
            .set('from', this.datePipe.transform(from.toString(), 'dd/MM/yyyy'))
            .set('to', this.datePipe.transform(to.toString(), 'dd/MM/yyyy'));
        return this.httpSrv.get<LTMTesting[]>('/ltm/data', params);
    }
}

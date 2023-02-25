import {Injectable} from '@angular/core';
import {ReportParam, REPORT_PARAMS_URL, ReportViewData} from './report-params-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ReportParamsService extends BaseEntityService<ReportParam> {

    constructor(public override httpSrv: HttpService) {
        super(httpSrv, REPORT_PARAMS_URL);
    }

    viewHTML(data: ReportViewData): Observable<any> {
        return this.httpSrv
            .postHTML('/reports/view', data);
    }

    viewPDF(data: ReportViewData): Observable<any> {
        return this.httpSrv.postBlob('/reports/view', data);
    }
}

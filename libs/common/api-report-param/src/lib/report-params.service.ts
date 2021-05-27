import {Injectable} from '@angular/core';
import {ReportParams, REPORT_PARAMS_URL} from './report-params-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';


@Injectable({
    providedIn: 'root'
})
export class ReportParamsService extends BaseEntityService<ReportParams> {

    constructor(public httpSrv: HttpService) {
        super(httpSrv, REPORT_PARAMS_URL);
    }
}

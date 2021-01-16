import {Injectable} from '@angular/core';
import {ReportParams, REPORT_PARAMS_URL} from './report-params-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {COMPANY_URL} from "@ss/administration/api-company";


@Injectable({
    providedIn: 'root'
})
export class ReportParamsService extends BaseEntityService<ReportParams> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, REPORT_PARAMS_URL);
    }

}

import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {ACC_ERA_REPORT_URL, ERAReport} from './accounting-api';

@Injectable({
    providedIn: 'root'
})
export class AccEraReportService extends BaseEntityService<ERAReport>{
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_ERA_REPORT_URL);
    }

}

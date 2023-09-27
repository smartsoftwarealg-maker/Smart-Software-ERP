import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { RoleReport } from './report-rights-api';


@Injectable({
    providedIn: 'root'
})
export class ReportReportService extends BaseEntityService<RoleReport>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/reports', '/roles');
    }
}

import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { REPORT_PRIVILEGE_URL, RPrivilege } from './report-privilege.api';
import { Observable } from 'rxjs';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class ReportPrivilegeService extends BaseEntityService<RPrivilege> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, REPORT_PRIVILEGE_URL);
    }

    updatePrivilege(rp: RPrivilege): Observable<{ count: number }> {
        return this.httpSrv.put(REPORT_PRIVILEGE_URL,  rp);
    }
}

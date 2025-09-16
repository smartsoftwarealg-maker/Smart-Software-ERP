import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { CRMLeadActivity, EMessage } from './lead-activity-api';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CrmLeadActivityService extends BaseEntityService<CRMLeadActivity> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/activities', '/crm/leads/');
    }
    sendEmail(message: EMessage): Observable<any> {
        return this.httpSrv.post('/email', message);
    }

}

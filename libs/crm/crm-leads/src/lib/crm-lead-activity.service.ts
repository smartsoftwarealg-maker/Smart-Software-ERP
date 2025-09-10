import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { CRMLeadActivity } from './lead-activity-api';

@Injectable({
    providedIn: 'root'
})
export class CrmLeadActivityService extends BaseEntityService<CRMLeadActivity> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/activities', '/crm/leads/');
    }

}

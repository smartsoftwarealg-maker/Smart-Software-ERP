import { BaseEntityService } from '@ss/common/api-base-entity';
import {CRM_OPPORTUNITY_URL, CRM_ACTIVITIES_URL, CRMOpportunityActivity} from './api';
import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root',
})
export class CrmOpportunityActiveService extends BaseEntityService<CRMOpportunityActivity> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CRM_ACTIVITIES_URL, CRM_OPPORTUNITY_URL);
    }
}

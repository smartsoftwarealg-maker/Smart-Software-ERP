import { BaseEntityService } from '@ss/common/api-base-entity';
import {CRM_OPPORTUNITY_URL, CRM_TRACKING_URL, CRMOpportunityProgressLogger} from './api';
import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root',
})
export class CrmOpportunityTrackingService extends BaseEntityService<CRMOpportunityProgressLogger> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CRM_TRACKING_URL, CRM_OPPORTUNITY_URL);
    }
}

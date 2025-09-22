import { BaseEntityService } from '@ss/common/api-base-entity';
import { CRM_LEADS_URL, CRM_TRACKING_URL, CRMLeadsProgressLogger } from './api';
import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CrmLeadsTrackingService extends BaseEntityService<CRMLeadsProgressLogger> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CRM_TRACKING_URL, CRM_LEADS_URL);
    }
}

import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import {CRMOpportunity, CRMOpportunityProgress} from './crm-opportunity-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root',
})
export class CRMOpportunityService extends BaseEntityService<CRMOpportunity> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/crm/opportunities');
    }

    saveProgress(progress: CRMOpportunityProgress) {
        return this.httpSrv.post('/crm/opportunities/progress', progress);
    }

}

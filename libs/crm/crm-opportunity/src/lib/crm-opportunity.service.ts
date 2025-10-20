import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import {CRMOpportunity, CRMOpportunityProgress} from '@ss/crm/opportunity';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root',
})
export class CRMOpportunityService extends BaseEntityService<CRMOpportunity> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/opportunities', '/crm/users');
    }

    saveProgress(progress: CRMOpportunityProgress) {
        return this.httpSrv.post('/crm/opportunities/progress', progress);
    }
}

import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CRMLead } from './lead-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CRMCampaignService extends BaseEntityService<CRMLead> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/crm/campaigns');
    }
}

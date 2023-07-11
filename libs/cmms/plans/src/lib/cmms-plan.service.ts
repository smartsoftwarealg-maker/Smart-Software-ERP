import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMS_PLANS_URL, CMMSPlan } from '../../../cmms-api/cmms-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CMMSPlanService extends BaseEntityService<CMMSPlan>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_PLANS_URL);
    }
}

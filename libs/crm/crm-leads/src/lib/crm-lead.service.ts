import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import {CRMLead, LeadConverter} from './lead-api';
import { HttpService } from '@ss/common/api-common';
import {CRMOpportunityProgress} from "../../../crm-opportunity/src/lib/crm-opportunity-api";

@Injectable({
    providedIn: 'root'
})
export class CRMLeadsService extends BaseEntityService<CRMLead> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/crm/leads');
    }

    saveProgress(progress: CRMOpportunityProgress) {
        return this.httpSrv.post('/crm/opportunities/progress', progress);
    }

    converter(converter: LeadConverter) {
        return this.httpSrv.post('/crm/leads/convert', converter);
    }


}

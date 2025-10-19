import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CRMLead, CRMLeadProgress, LeadConverter } from './lead-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CRMLeadsService extends BaseEntityService<CRMLead> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/leads', '/crm/users');
    }

    saveProgress(progress: CRMLeadProgress) {
        return this.httpSrv.post('/crm/leads/progress', progress);
    }

    converter(converter: LeadConverter) {
        return this.httpSrv.post('/crm/leads/convert', converter);
    }


}

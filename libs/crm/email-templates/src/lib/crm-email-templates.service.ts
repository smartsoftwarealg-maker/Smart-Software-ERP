import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import {EmailTemplate} from "./crm-email-templates.api";

@Injectable({
    providedIn: 'root'
})
export class CRMEmailTemplatesService extends BaseEntityService<EmailTemplate> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  '/crm/email-templates');
    }

}

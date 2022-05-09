import { BaseEntityService } from '@ss/common/api-base-entity';
import { Organization, ORGANIZATION_URL } from './org-api';
import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class OrganizationsService extends BaseEntityService<Organization> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, ORGANIZATION_URL);
    }

}
import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from '@ss/logistics/ui-doc-import';

export const DEPARTMENTS_URL = '/crm/crm_departments';

@Injectable({
    providedIn: 'root',
})
export class DepartmentsService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DEPARTMENTS_URL);
    }
}

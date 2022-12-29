import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { DEPARTMENTS_URL, Department } from './lookups-api';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService extends BaseEntityService<Department> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DEPARTMENTS_URL);
    }

}

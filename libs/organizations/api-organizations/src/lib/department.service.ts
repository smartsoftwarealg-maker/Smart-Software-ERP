import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Department, DEPARTMENTS_URL } from './organizations-api';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService extends BaseEntityService<Department> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, DEPARTMENTS_URL[1], DEPARTMENTS_URL[0]);
    }

}

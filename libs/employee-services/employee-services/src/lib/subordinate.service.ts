import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import {
    Employee,
    SUBORDINATE_URL
} from '@ss/employee-services/employee-services';

@Injectable({
    providedIn: 'root'
})
export class SubordinateService extends BaseEntityService<Employee> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SUBORDINATE_URL);
    }
}

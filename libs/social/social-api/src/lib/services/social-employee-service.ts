import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { EMPLOYEE_URL } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';
import { Employee } from '@ss/employee-services/employee-services';

@Injectable({ providedIn: 'root' })
export class SocialEmployeeService extends BaseEntityService<Employee> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, EMPLOYEE_URL);
    }
}

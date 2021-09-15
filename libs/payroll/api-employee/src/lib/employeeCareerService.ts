import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { CAREER_PARENT_URL, CAREER_CHILD_URL, Career } from './employee-api';


@Injectable({ providedIn: 'root' })
export class EmployeeActivationService extends BaseEntityService<Career> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CAREER_CHILD_URL, CAREER_PARENT_URL);
    }

}

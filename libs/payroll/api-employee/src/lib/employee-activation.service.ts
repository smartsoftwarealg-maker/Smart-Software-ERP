import { Injectable } from '@angular/core';
// import {BaseEntityService} from '@ss/common/api-base-entity';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { ACTIVATION_PARENT_URL, ACTIVATION_CHILD_URL, EmployeeActivation } from './employee-api';


@Injectable({ providedIn: 'root' })
export class EmployeeActivationService extends BaseEntityService<EmployeeActivation> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACTIVATION_CHILD_URL, ACTIVATION_PARENT_URL);
    }
}

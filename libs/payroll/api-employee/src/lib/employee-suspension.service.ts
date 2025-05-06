import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Suspension, SUSPENSION_PARENT_URL, SUSPENSION_CHILD_URL } from './employee-api';


@Injectable({ providedIn: 'root' })
export class EmployeeSuspensionService extends BaseEntityService<Suspension> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SUSPENSION_CHILD_URL, SUSPENSION_PARENT_URL);
    }

}

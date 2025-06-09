import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { UNPAID_LEAVE_PARENT_URL, UNPAID_LEAVE_CHILD_URL, UnpaidLeave } from './employee-api';


@Injectable({ providedIn: 'root' })
export class EmployeeUnpaidLeavesService extends BaseEntityService<UnpaidLeave> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, UNPAID_LEAVE_CHILD_URL, UNPAID_LEAVE_PARENT_URL);
    }

}

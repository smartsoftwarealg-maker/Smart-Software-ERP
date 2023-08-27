import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { DECISION_PARENT_URL, Decision, DECISION_CHILD_URL } from './employee-api';


@Injectable({ providedIn: 'root' })
export class EmployeeDecisionService extends BaseEntityService<Decision> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DECISION_CHILD_URL, DECISION_PARENT_URL);
    }
}

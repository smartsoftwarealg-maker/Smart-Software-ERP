import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { CHILDREN_PARENT_URL, CHILDREN_CHILD_URL, Child } from './employee-api';


@Injectable({ providedIn: 'root' })
export class EmployeeChildrenService extends BaseEntityService<Child> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, CHILDREN_CHILD_URL, CHILDREN_PARENT_URL);
    }

}

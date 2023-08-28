import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { OLD_CAREER_PARENT_URL, OLD_CAREER_CHILD_URL, OldCareer } from './employee-api';


@Injectable({ providedIn: 'root' })
export class EmployeeOldCareerService extends BaseEntityService<OldCareer> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, OLD_CAREER_CHILD_URL, OLD_CAREER_PARENT_URL);
    }
}

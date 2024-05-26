import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AIDS_URL, SOCIAL_WORKS_TYPE, EMPLOYEE_URL, SocialAid } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class EmployeeAidService extends BaseEntityService<SocialAid> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, AIDS_URL, EMPLOYEE_URL);
        this.setParentId(SOCIAL_WORKS_TYPE);
    }
}

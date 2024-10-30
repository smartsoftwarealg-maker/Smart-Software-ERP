import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AIDS_URL, SOCIAL_EMPLOYEES_URL, SocialAid } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class PersonAidHistoryService extends BaseEntityService<SocialAid> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, AIDS_URL, SOCIAL_EMPLOYEES_URL);
        this.setParentId(0);
    }
}

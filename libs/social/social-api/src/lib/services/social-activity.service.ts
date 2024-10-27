import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AIDS_URL, MEDICAL_AIDS_TYPE, SocialActivity, SocialAid, TYPES_URL } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class SocialActivityService extends BaseEntityService<SocialActivity> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/social/activities');
    }
}

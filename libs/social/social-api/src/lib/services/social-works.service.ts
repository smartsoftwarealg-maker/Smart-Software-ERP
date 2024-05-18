import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AIDS_URL, SOCIAL_WORKS_TYPE, SocialAid, TYPES_URL } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class SocialWorksService extends BaseEntityService<SocialAid> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, AIDS_URL, TYPES_URL);
        this.setParentId(SOCIAL_WORKS_TYPE);
    }

}

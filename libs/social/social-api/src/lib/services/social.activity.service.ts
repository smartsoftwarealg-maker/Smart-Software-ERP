import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { SOCIAL_ACTIVITIES_URL, SOCIAL_AIDS_URL, SocialAid } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';
import { Lookup } from '@ss/common/api-lookup';

@Injectable({ providedIn: 'root' })
export class SocialActivityService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SOCIAL_ACTIVITIES_URL);
    }

}

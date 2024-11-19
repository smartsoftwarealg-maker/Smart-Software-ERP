import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AIDS_URL, MEDICAL_AIDS_TYPE, SocialActivity, SocialAid, TYPES_URL } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';
import { Lookup } from '@ss/common/api-lookup';

@Injectable({ providedIn: 'root' })
export class MutualRejectionsService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/social/mutual_rejections');
    }
}

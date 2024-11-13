import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AIDS_URL, EDOHeader, MEDICAL_AIDS_TYPE, MutualRequest, SocialAid, TYPES_URL } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class MutualRequestService extends BaseEntityService<MutualRequest> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/social/mutual-requests');
    }

}

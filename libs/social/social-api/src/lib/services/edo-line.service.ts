import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AIDS_URL, EDOHeader, EDOLine, MEDICAL_AIDS_TYPE, SocialAid, TYPES_URL } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({ providedIn: 'root' })
export class EdoLineService extends BaseEntityService<EDOLine> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lines', '/social/edo');
    }

}

import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AIDS_URL, MUTUAL_AIDS_TYPE, SOCIAL_WORKS_TYPE, SocialAid, TYPES_URL } from '@social/social-api';
import { HttpService } from '@ss/common/api-common';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class MutualAidService extends BaseEntityService<SocialAid> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, AIDS_URL, TYPES_URL);
        this.setParentId(MUTUAL_AIDS_TYPE);
    }

    upload(data: FormData): Observable<any> {
        return this.httpSrv.upload('/social/mutual-aids/excel-injection', data);
    }

}

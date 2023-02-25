import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {LTM_LINE_URL, LTM_LTM_LINE_URL, LTM_MATTER_URL, LTMLineMatter} from './ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LtmLineMatterService extends BaseEntityService<LTMLineMatter> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_MATTER_URL, LTM_LTM_LINE_URL);
        this.setParentId(0);
    }
}

import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {LTM_LINE_URL, LTM_MATTER_URL, LTMLine, LTMMatter} from './ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LtmMatterService extends BaseEntityService<LTMMatter> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/ltm/matters');
    }
}

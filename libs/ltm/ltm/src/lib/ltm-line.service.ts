import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {LTM_LINE_URL, LTMLine} from './ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LtmLineService extends BaseEntityService<LTMLine> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_LINE_URL);
    }
}

import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {LTM_TEST_URL, LTMTest} from '../ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LtmTestService extends BaseEntityService<LTMTest> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_TEST_URL);
    }
}

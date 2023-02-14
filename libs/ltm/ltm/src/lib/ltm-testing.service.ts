import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {LTM_LTM_LINE_URL, LTM_TEST_URL, LTM_TESTINGS_URL, LTMTesting} from './ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LtmTestingService extends BaseEntityService<LTMTesting> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, '/tests', LTM_LTM_LINE_URL);
      super.setParentId(0);
  }
}

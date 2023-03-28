import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {LTM_MATTER_URL, LTMMatterTest} from './ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})

export class LtmMatterTestLookupService extends BaseEntityService<LTMMatterTest>{

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, '/list', '/ltm/tests');
  }
}

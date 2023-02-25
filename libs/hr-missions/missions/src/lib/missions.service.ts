import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Mission, MISSIONS_URL} from './missions-api.class';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class MissionsService extends BaseEntityService<Mission> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, MISSIONS_URL);
  }
}

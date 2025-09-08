import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Mission, MISSIONS_URL, ZONE_URL} from '@ss/hr-missions';
import {HttpService} from '@ss/common/api-common';
import {Lookup} from '@ss/common/api-lookup';

@Injectable({
  providedIn: 'root'
})
export class ZoneService extends BaseEntityService<Lookup> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, ZONE_URL);
  }
}

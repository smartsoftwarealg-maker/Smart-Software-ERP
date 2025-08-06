import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {Lookup} from '@ss/common/api-lookup';
import { ZONE_URL } from './mission-elements-api.class';

@Injectable({
  providedIn: 'root'
})
export class ZoneService extends BaseEntityService<Lookup> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, ZONE_URL);
  }
}

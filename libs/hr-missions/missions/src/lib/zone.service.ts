import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Mission, MISSIONS_URL, TRANSPORT_URL, ZONE_URL} from './missions-api.class';
import {HttpService} from '@ss/common/api-common';
import {Lookup} from '@ss/common/api-lookup';

@Injectable({
  providedIn: 'root'
})
export class TransportService extends BaseEntityService<Lookup> {

  constructor(protected httpSrv: HttpService) {
      super(httpSrv, TRANSPORT_URL);
  }
}

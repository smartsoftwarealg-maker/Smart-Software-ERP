import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {
    MissionElement,
    MissionElementPricing,
    MISSIONS_ELEMENTS_URL,
    MISSIONS_PRICING_URL
} from './mission-elements-api.class';

@Injectable({
  providedIn: 'root'
})
export class MissionsElementPricingService extends BaseEntityService<MissionElementPricing> {

  constructor(protected override httpSrv: HttpService) {
      super(httpSrv,MISSIONS_PRICING_URL, MISSIONS_ELEMENTS_URL);
  }
}

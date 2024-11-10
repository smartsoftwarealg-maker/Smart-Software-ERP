import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { LTM_PICKUP_POINTS_URL, LTMPickupPoint } from '../ltm-api';
import {HttpService} from '@ss/common/api-common';
import { Lookup } from "@ss/common/api-lookup";

@Injectable({
  providedIn: 'root'
})
export class LtmPickupPointService extends BaseEntityService<LTMPickupPoint> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_PICKUP_POINTS_URL);
    }
}

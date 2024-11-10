import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    LTM_MIXTURE_URL,
    LTM_PICKUP_POINTS_CHILD_URL,
    LTMMixturePickupPoint
} from '../ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LtmMixturePickupPointService extends BaseEntityService<LTMMixturePickupPoint> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_PICKUP_POINTS_CHILD_URL, LTM_MIXTURE_URL);
    }
}

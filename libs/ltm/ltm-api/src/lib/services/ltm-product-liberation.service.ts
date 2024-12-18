import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
     LTM_PRODUCT_LIBERATION_URL,
    LTMProductLiberation,
} from '../ltm-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LtmProductLiberationService extends BaseEntityService<LTMProductLiberation> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_PRODUCT_LIBERATION_URL);
    }
}

import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {PAY_MODE_URL, PayMode} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class PayModeService extends BaseEntityService<PayMode> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PAY_MODE_URL);
    }

}

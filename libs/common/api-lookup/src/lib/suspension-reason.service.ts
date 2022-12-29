import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {SuspensionReason, SUSPENSION_REASON_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class SuspensionReasonService extends BaseEntityService<SuspensionReason> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SUSPENSION_REASON_URL);
    }

}

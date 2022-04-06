import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ACC_POLICY_URL, ACCPolicy} from './accounting-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class AccPoliciesService extends BaseEntityService<ACCPolicy> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_POLICY_URL);
    }
}

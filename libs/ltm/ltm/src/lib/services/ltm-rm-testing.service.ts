import { Injectable } from '@angular/core';
import { LTM_TESTING_URL, LTM_MATTER_URL, LTM_RM_TESTING_URL } from '../ltm-api';
import { HttpService } from "@ss/common/api-common";
import { LtmBaseTestingClass } from './ltm-base-testing.class';
import { LTM_DEPOSIT_TEST_URL, LTM_PHYSICAL_TEST_URL } from '../../../../../../apps/erp/src/app/common';

@Injectable({
    providedIn: 'root'
})
export class LtmRmTestingService extends LtmBaseTestingClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_RM_TESTING_URL, LTM_MATTER_URL);
    }
}



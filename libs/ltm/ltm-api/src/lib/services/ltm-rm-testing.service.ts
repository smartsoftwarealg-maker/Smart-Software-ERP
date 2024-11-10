import { Injectable } from '@angular/core';
import { LTM_MATTER_URL, LTM_RM_TESTING_URL } from '../ltm-api';
import { HttpService } from "@ss/common/api-common";
import { LtmBaseTestingClass } from './ltm-base-testing.class';

@Injectable({
    providedIn: 'root'
})
export class LtmRmTestingService extends LtmBaseTestingClass {
    // Raw Material testing
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_RM_TESTING_URL, LTM_MATTER_URL);
    }
}



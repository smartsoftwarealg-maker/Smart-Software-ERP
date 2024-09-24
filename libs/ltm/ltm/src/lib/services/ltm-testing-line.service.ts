import { Injectable } from '@angular/core';
import { LTM_TESTING_URL, LTM_MATTER_URL, LTMTestingLine, LTM_TESTINGS_URL, LTM_LINES_URL } from '../ltm-api';
import { HttpService } from "@ss/common/api-common";
import { LtmBaseTestingClass } from './ltm-base-testing.class';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class LtmTestingLineService extends BaseEntityService<LTMTestingLine> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_LINES_URL, LTM_TESTINGS_URL);
    }
}



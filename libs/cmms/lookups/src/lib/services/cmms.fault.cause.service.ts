import { Injectable } from '@angular/core';
import { BaseLookupService } from "@ss/common/api-common";
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CMMSFaultCauseService extends BaseLookupService {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/cmms_fault_causes');
    }
}

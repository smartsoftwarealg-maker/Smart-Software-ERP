import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseLookupService } from '../../../../../common/api-common/src/lib/base-lookup.service';

@Injectable({
    providedIn: 'root'
})
export class CMMSPriorityService extends BaseLookupService {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/cmms_priorities');
    }
}

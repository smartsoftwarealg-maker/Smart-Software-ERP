import { Injectable } from '@angular/core';
import { BaseLookupService } from '../../../../../common/api-common/src/lib/base-lookup.service';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CMMSMeterService extends BaseLookupService {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/cmms_meters');
    }
}

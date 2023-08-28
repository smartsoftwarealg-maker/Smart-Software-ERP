import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseLookupService } from './base-lookup.service';

@Injectable({
    providedIn: 'root'
})
export class CMMSFunctionService extends BaseLookupService {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/cmms_functions');
    }
}

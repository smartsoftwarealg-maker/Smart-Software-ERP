import { Injectable } from '@angular/core';
import { BaseLookupService } from './base-lookup.service';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CMMSTypeService extends BaseLookupService {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/cmms_types');
    }
}

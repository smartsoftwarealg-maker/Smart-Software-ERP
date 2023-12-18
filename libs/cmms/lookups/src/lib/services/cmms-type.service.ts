import { Injectable } from '@angular/core';
import { BaseLookupService } from '@ss/common/api-common';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CmmsTypeService extends BaseLookupService {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/cmms_types');
    }
}

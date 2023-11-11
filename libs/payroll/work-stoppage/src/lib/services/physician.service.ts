import { Injectable } from '@angular/core';
import { BaseLookupService, HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class PhysicianService extends BaseLookupService {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/social_physicians');
    }
}

import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { DriverLicense, DRIVERS, LICENSES } from '../driver-api';

@Injectable({
    providedIn: 'root'
})
export class DriverLicenseService extends BaseEntityService<DriverLicense> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LICENSES, DRIVERS);
    }
}

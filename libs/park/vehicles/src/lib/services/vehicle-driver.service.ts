import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { DRIVERS, VehicleDriver, VEHICLES } from '../vehicle-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class VehicleDriverService extends BaseEntityService<VehicleDriver> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DRIVERS, VEHICLES);
    }
}

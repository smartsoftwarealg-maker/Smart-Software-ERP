import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { DRIVERS, DriverVehicle, VEHICLES } from '../driver-api';

@Injectable({
    providedIn: 'root'
})
export class DriverVehicleService extends BaseEntityService<DriverVehicle> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, VEHICLES, DRIVERS);
    }
}

import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { MAINTENANCE, VehicleMaintenance, VEHICLES } from '../vehicle-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class VehicleMaintenanceService extends BaseEntityService<VehicleMaintenance> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, MAINTENANCE, VEHICLES);
    }
}

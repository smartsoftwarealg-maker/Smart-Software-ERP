import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { VEHICLE_STATES, VehicleState, VEHICLES } from '../vehicle-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class VehicleStateService extends BaseEntityService<VehicleState> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, VEHICLE_STATES);
    }
}

import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { MISSIONS, VehicleMission, VEHICLES } from '../vehicle-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class VehicleMissionService extends BaseEntityService<VehicleMission> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, MISSIONS, VEHICLES);
    }
}

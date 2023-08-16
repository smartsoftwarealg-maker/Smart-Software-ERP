import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { FUEL, FuelConsumption, VEHICLES } from '../vehicle-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class VehicleFuelConsumptionService extends BaseEntityService<FuelConsumption> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, FUEL, VEHICLES);
    }
}

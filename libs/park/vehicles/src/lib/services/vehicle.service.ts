import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Vehicle, VEHICLES } from '../vehicle-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class VehicleService extends BaseEntityService<Vehicle> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, VEHICLES);
    }
}

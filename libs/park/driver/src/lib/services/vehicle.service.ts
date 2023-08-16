import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Vehicle, VEHICLES } from '../driver-api';

@Injectable({
    providedIn: 'root'
})
export class VehicleService extends BaseEntityService<Vehicle> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, VEHICLES);
    }
}

import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { DAMAGES, VehicleDamage, VEHICLES } from '../vehicle-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class VehicleDamageService extends BaseEntityService<VehicleDamage> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DAMAGES, VEHICLES);
    }
}

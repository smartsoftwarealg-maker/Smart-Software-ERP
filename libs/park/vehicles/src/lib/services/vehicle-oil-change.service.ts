import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { OIL, OilChange, VEHICLES } from '../vehicle-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class VehicleOilChangeService extends BaseEntityService<OilChange>{

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, OIL, VEHICLES);
    }
}

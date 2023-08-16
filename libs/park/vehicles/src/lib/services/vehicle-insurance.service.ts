import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { INSURANCES, VehicleInsurance, VEHICLES } from '../vehicle-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class VehicleInsuranceService extends BaseEntityService<VehicleInsurance> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, INSURANCES, VEHICLES);
    }
}

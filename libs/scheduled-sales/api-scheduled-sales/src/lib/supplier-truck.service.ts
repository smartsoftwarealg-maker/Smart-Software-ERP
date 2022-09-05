import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {SS_TRUCK_URL, TruckContract} from './scheduled-sales-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class SupplierTruckService extends BaseEntityService<TruckContract> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SS_TRUCK_URL);
    }
}

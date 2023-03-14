import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {
    FURNITURE_RECEIVER,
    FURNITURE_RECEPTIONS,
    FURNITURE_SALES,
    FurnitureReceiver,
    FurnitureTransaction
} from './furniture-api';

@Injectable({
  providedIn: 'root'
})
export class FurnitureSalesService extends BaseEntityService<FurnitureTransaction> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, FURNITURE_SALES);
    }
}

import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {FURNITURE_RECEIVER, FURNITURE_RECEPTIONS, FurnitureReceiver, FurnitureTransaction} from './furniture-api';

@Injectable({
  providedIn: 'root'
})
export class FurnitureReceptionService extends BaseEntityService<FurnitureTransaction> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, FURNITURE_RECEPTIONS);
    }
}

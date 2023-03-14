import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {FURNITURE_RECEIVER, FurnitureReceiver} from './furniture-api';

@Injectable({
  providedIn: 'root'
})
export class FurnitureReceiverService extends BaseEntityService<FurnitureReceiver> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, FURNITURE_RECEIVER);
    }
}

import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {FURNITURE, Furniture} from './furniture-api';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService extends BaseEntityService<Furniture> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, FURNITURE);
    }
}

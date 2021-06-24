import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Unit, UNITS_URL } from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class UnitService extends BaseEntityService<Unit> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, UNITS_URL);
    }
}

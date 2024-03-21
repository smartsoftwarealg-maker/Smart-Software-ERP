import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Constant, GICA_CONSTANTS } from '../gica-careers-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class ConstantService extends BaseEntityService<Constant> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GICA_CONSTANTS);
    }
}

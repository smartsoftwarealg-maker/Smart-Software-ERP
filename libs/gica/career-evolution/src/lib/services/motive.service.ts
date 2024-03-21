import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { GICA_MOTIVES, Motive } from '../gica-careers-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class MotiveService extends BaseEntityService<Motive> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GICA_MOTIVES);
    }
}

import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CareerMotive, GICA_CAREER_MOTIVES } from '../gica-careers-api';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CareerMotiveService extends BaseEntityService<CareerMotive> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GICA_CAREER_MOTIVES);
    }
}

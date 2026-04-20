import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {UnitsOfMeasure} from "@ss/master-data/api-article";

export const UNITS_URL = '/production/units';

@Injectable({
    providedIn: 'root'
})
export class UnitsService extends BaseEntityService<UnitsOfMeasure> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, UNITS_URL);
    }
}

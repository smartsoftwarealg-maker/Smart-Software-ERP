import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Deduction, GICA_DEDUCTIONS } from '../gica-careers-api';
import { BaseEntityService } from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class DeductionService extends BaseEntityService<Deduction> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GICA_DEDUCTIONS);
    }
}

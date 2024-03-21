import { inject, Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { AbsenceWeight, GICA_WEIGHTS } from '../gica-careers-api';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AbsenceWeightService extends BaseEntityService<AbsenceWeight> {
    private router = inject(Router);
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GICA_WEIGHTS);
    }
}

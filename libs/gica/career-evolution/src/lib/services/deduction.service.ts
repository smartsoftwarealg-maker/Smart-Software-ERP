import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Deduction, GICA_DEDUCTIONS } from '../gica-careers-api';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DeductionService extends BaseEntityService<Deduction> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GICA_DEDUCTIONS);
    }

    generate(year: number): Observable<{ count: number }> {
        return this.httpSrv.post(`${GICA_DEDUCTIONS}/${year}`);
    }

}

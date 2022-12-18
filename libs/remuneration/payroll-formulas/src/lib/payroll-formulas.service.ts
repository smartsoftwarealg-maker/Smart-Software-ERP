import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Formula, PAYROLL_FORMULAS_URL} from './payroll-formulas-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class PayrollFormulasService extends BaseEntityService<Formula> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PAYROLL_FORMULAS_URL);
    }
}

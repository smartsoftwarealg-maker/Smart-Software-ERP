import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Consumption, CONSUMPTION_URL, LOAN_PAYROLL_LOANS_URLS} from '@ss/remuneration/loans';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LoansConsumptionService extends BaseEntityService<Consumption> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CONSUMPTION_URL, LOAN_PAYROLL_LOANS_URLS);
    }
}

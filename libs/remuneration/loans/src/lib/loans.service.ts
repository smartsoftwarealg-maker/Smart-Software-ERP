import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Loan, LOAN_PAYROLL_LOANS_URLS} from './loans-class';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class LoansService extends BaseEntityService<Loan> {
  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, LOAN_PAYROLL_LOANS_URLS);
  }
}

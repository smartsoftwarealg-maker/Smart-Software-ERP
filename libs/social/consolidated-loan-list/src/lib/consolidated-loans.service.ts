import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Loan, LOAN_LOANS, LOAN_PAYROLL_CENTERS, LOAN_PAYROLL_LOANS_URLS } from '@ss/remuneration/loans';

@Injectable({
  providedIn: 'root'
})
export class ConsolidatedLoansService extends BaseEntityService<Loan> {
  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, LOAN_LOANS, LOAN_PAYROLL_CENTERS);
      this.setParentId(0);
  }
}
